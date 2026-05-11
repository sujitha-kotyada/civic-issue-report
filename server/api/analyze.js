const { MongoClient } = require('mongodb');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  try {
    const { imageUrl, metadata } = req.body || {};
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });

    // Call AI provider
    const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
    const AI_API_KEY = process.env.AI_API_KEY;
    const AI_MODEL = process.env.AI_MODEL || '';
    if (!AI_SERVICE_URL || !AI_API_KEY) return res.status(500).json({ error: 'AI not configured' });

    const prompt = `Analyze image and return JSON {category,priority,confidence,explanation}. Image: ${imageUrl}`;
    const aiResp = await fetch(AI_SERVICE_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: AI_MODEL, input: prompt })
    });
    const aiResult = await aiResp.json();

    // Save to MongoDB if configured
    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
      const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db();
      await db.collection(process.env.ISSUES_COLLECTION || 'issues').insertOne({ imageUrl, aiResult, createdAt: new Date() });
      await client.close();
    }

    // Save to Supabase if configured
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      await supabase.from('issues').insert([{ image_url: imageUrl, ai_result: aiResult }]);
    }

    res.status(200).json({ ok: true, aiResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
