// Minimal server scaffold to demonstrate wiring secrets and calling AI + DB
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// CORS configuration
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174').split(',').map(s => s.trim());
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let mongoClient;
let db;

async function connectMongo() {
  if (!MONGODB_URI) return null;
  try {
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    db = mongoClient.db();
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return null;
  }
}

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function callAI(imageUrl, extra) {
  // Generic fetch-based AI call. Adapt payload to your provider.
  const url = process.env.AI_SERVICE_URL;
  const key = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || '';
  if (!url || !key) throw new Error('AI_SERVICE_URL or AI_API_KEY not configured');

  const prompt = `Analyze this issue image and return JSON {category,priority,confidence,explanation}.\nImage: ${imageUrl}\nContext: ${extra || ''}`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`AI provider error: ${resp.status} ${text}`);
  }
  return resp.json();
}

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Civic Issue Reporting API',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'not connected'
  });
});

// Get all issues
app.get('/issues', async (req, res) => {
  try {
    if (!db) {
      return res.json({ issues: [], message: 'Database not connected' });
    }
    const collection = process.env.ISSUES_COLLECTION || 'issues';
    const issues = await db.collection(collection).find({}).sort({ createdAt: -1 }).limit(50).toArray();
    res.json({ issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Analyze an issue image with AI
app.post('/analyze', async (req, res) => {
  try {
    const { imageUrl, metadata } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });

    const aiResult = await callAI(imageUrl, metadata);

    // Save to MongoDB (example)
    if (db) {
      await db.collection(process.env.ISSUES_COLLECTION || 'issues').insertOne({
        imageUrl,
        aiResult,
        createdAt: new Date()
      });
    }

    // Optionally mirror to Supabase
    if (supabase) {
      await supabase.from('issues').insert([{ image_url: imageUrl, ai_result: aiResult }]);
    }

    res.json({ ok: true, aiResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4000;

// Connect to database then start server
connectMongo().then(() => {
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
});
