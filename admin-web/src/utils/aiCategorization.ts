// AI-powered department categorization system

export interface Department {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  urgencyMultiplier: number; // Affects AI scoring
}

export const departments: Department[] = [
  {
    id: 'water-utilities',
    name: 'Water & Utilities',
    description: 'Water supply, sewage, drainage, and utility infrastructure',
    keywords: ['water', 'pipe', 'leak', 'burst', 'sewage', 'drain', 'flooding', 'utility', 'main', 'hydrant'],
    urgencyMultiplier: 1.5
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Traffic signals, road signs, and traffic management',
    keywords: ['traffic', 'signal', 'light', 'sign', 'intersection', 'crossing', 'pedestrian', 'vehicle', 'lane'],
    urgencyMultiplier: 1.3
  },
  {
    id: 'public-works',
    name: 'Public Works',
    description: 'Road maintenance, infrastructure repair, and construction',
    keywords: ['pothole', 'road', 'pavement', 'sidewalk', 'curb', 'bridge', 'construction', 'repair', 'crack'],
    urgencyMultiplier: 1.2
  },
  {
    id: 'sanitation',
    name: 'Sanitation',
    description: 'Waste management, garbage collection, and street cleaning',
    keywords: ['garbage', 'trash', 'waste', 'bin', 'collection', 'overflow', 'dump', 'litter', 'cleanup', 'recycle'],
    urgencyMultiplier: 1.1
  },
  {
    id: 'electrical-services',
    name: 'Electrical Services',
    description: 'Street lighting, electrical infrastructure, and power systems',
    keywords: ['streetlight', 'light', 'electrical', 'power', 'outage', 'cable', 'wire', 'pole', 'transformer'],
    urgencyMultiplier: 1.3
  },
  {
    id: 'parks-recreation',
    name: 'Parks & Recreation',
    description: 'Parks, playgrounds, recreational facilities, and green spaces',
    keywords: ['park', 'playground', 'bench', 'tree', 'grass', 'recreation', 'sports', 'garden', 'fence', 'equipment'],
    urgencyMultiplier: 1.0
  },
  {
    id: 'public-safety',
    name: 'Public Safety',
    description: 'Security, emergency response, and public safety concerns',
    keywords: ['safety', 'emergency', 'security', 'camera', 'crime', 'vandalism', 'graffiti', 'dangerous', 'hazard'],
    urgencyMultiplier: 1.4
  },
  {
    id: 'maintenance',
    name: 'General Maintenance',
    description: 'Building maintenance and general repairs',
    keywords: ['building', 'maintenance', 'repair', 'damage', 'broken', 'fix', 'clean', 'paint', 'structure'],
    urgencyMultiplier: 1.0
  },
  {
    id: 'environmental',
    name: 'Environmental Services',
    description: 'Environmental concerns, pollution, and air quality',
    keywords: ['pollution', 'environment', 'air', 'noise', 'contamination', 'chemical', 'toxic', 'smell', 'fumes'],
    urgencyMultiplier: 1.3
  }
];

// AI scoring factors for different issue attributes
const AI_SCORING_FACTORS = {
  LOCATION_MULTIPLIERS: {
    'hospital': 2.0,
    'school': 1.8,
    'emergency': 1.9,
    'medical': 1.8,
    'downtown': 1.4,
    'business': 1.3,
    'residential': 1.1,
    'park': 1.0
  },
  PRIORITY_BASE_SCORES: {
    'critical': 90,
    'high': 70,
    'medium': 50,
    'low': 30
  },
  CATEGORY_MULTIPLIERS: {
    'utilities': 1.4,
    'traffic': 1.3,
    'public-safety': 1.5,
    'infrastructure': 1.2,
    'sanitation': 1.1,
    'environment': 1.3
  }
};

export function categorizeIssueDepartment(
  title: string, 
  description: string, 
  category: string,
  location: string
): { department: Department; confidence: number; reasoning: string[] } {
  const text = `${title} ${description} ${category}`.toLowerCase();
  const locationText = location.toLowerCase();
  
  const scores = departments.map(dept => {
    let score = 0;
    const matchedKeywords: string[] = [];
    
    // Check keyword matches
    dept.keywords.forEach(keyword => {
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (keywordRegex.test(text)) {
        score += 10;
        matchedKeywords.push(keyword);
      }
      // Bonus for multiple mentions of the same keyword
      const matches = text.match(new RegExp(keyword, 'gi'));
      if (matches && matches.length > 1) {
        score += matches.length * 2;
      }
    });
    
    // Apply urgency multiplier
    score *= dept.urgencyMultiplier;
    
    // Location-based scoring
    Object.entries(AI_SCORING_FACTORS.LOCATION_MULTIPLIERS).forEach(([locKeyword, multiplier]) => {
      if (locationText.includes(locKeyword)) {
        score *= multiplier;
      }
    });
    
    return {
      department: dept,
      score,
      matchedKeywords,
      confidence: Math.min(score / 20, 100) // Normalize to percentage
    };
  });
  
  // Sort by score and get the best match
  const sortedScores = scores.sort((a, b) => b.score - a.score);
  const bestMatch = sortedScores[0];
  
  // Generate reasoning
  const reasoning: string[] = [];
  if (bestMatch.matchedKeywords.length > 0) {
    reasoning.push(`Matched keywords: ${bestMatch.matchedKeywords.join(', ')}`);
  }
  if (bestMatch.department.urgencyMultiplier > 1.0) {
    reasoning.push(`High urgency department (${bestMatch.department.urgencyMultiplier}x multiplier)`);
  }
  
  // Check for location-based reasoning
  Object.entries(AI_SCORING_FACTORS.LOCATION_MULTIPLIERS).forEach(([locKeyword, multiplier]) => {
    if (location.toLowerCase().includes(locKeyword) && multiplier > 1.0) {
      reasoning.push(`Critical location: ${locKeyword} area`);
    }
  });
  
  if (reasoning.length === 0) {
    reasoning.push(`Categorized based on content analysis and departmental expertise`);
  }
  
  return {
    department: bestMatch.department,
    confidence: Math.round(bestMatch.confidence),
    reasoning
  };
}

export function calculateAIScore(
  title: string,
  description: string,
  category: string,
  priority: string,
  location: string,
  upvotes: number
): number {
  let baseScore = AI_SCORING_FACTORS.PRIORITY_BASE_SCORES[priority as keyof typeof AI_SCORING_FACTORS.PRIORITY_BASE_SCORES] || 30;
  
  // Apply category multiplier
  const categoryMultiplier = AI_SCORING_FACTORS.CATEGORY_MULTIPLIERS[category as keyof typeof AI_SCORING_FACTORS.CATEGORY_MULTIPLIERS] || 1.0;
  baseScore *= categoryMultiplier;
  
  // Location-based scoring
  const locationText = location.toLowerCase();
  Object.entries(AI_SCORING_FACTORS.LOCATION_MULTIPLIERS).forEach(([keyword, multiplier]) => {
    if (locationText.includes(keyword)) {
      baseScore *= multiplier;
    }
  });
  
  // Community engagement factor (upvotes)
  const engagementBonus = Math.min(upvotes * 0.5, 15); // Max 15 points from upvotes
  baseScore += engagementBonus;
  
  // Keywords that indicate high urgency
  const urgentKeywords = ['burst', 'flooding', 'emergency', 'danger', 'unsafe', 'critical', 'urgent', 'immediate'];
  const text = `${title} ${description}`.toLowerCase();
  urgentKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      baseScore += 5;
    }
  });
  
  return Math.min(Math.round(baseScore), 100);
}

// Function to get officer assignment based on department and workload
export function assignOfficer(departmentId: string): string {
  const officerAssignments: { [key: string]: string[] } = {
    'water-utilities': ['James Wilson', 'Sarah Martinez', 'Mike Chen'],
    'transportation': ['Maria Rodriguez', 'David Park', 'Lisa Wang'],
    'public-works': ['Robert Kim', 'Sarah Lee', 'Tom Johnson'],
    'sanitation': ['Lisa Park', 'Carlos Martinez', 'Anna Davis'],
    'electrical-services': ['Tom Davis', 'Jennifer Liu', 'Mark Thompson'],
    'parks-recreation': ['Mike Johnson', 'David Chen', 'Emma Wilson'],
    'public-safety': ['Sarah Connor', 'John Smith', 'Alex Rodriguez'],
    'maintenance': ['Anna Thompson', 'Chris Lee', 'Mary Johnson'],
    'environmental': ['Dr. Green', 'Sam Taylor', 'Nina Patel']
  };
  
  const officers = officerAssignments[departmentId] || ['System Administrator'];
  
  // Simple round-robin assignment (in real system, this would check actual workloads)
  const randomIndex = Math.floor(Math.random() * officers.length);
  return officers[randomIndex];
}

// Function to estimate resolution time based on department and priority
export function estimateResolutionTime(departmentId: string, priority: string): string {
  const baseHours: { [key: string]: { [key: string]: number } } = {
    'water-utilities': { critical: 2, high: 4, medium: 12, low: 48 },
    'transportation': { critical: 4, high: 8, medium: 24, low: 72 },
    'public-works': { critical: 6, high: 12, medium: 48, low: 168 },
    'sanitation': { critical: 8, high: 24, medium: 48, low: 168 },
    'electrical-services': { critical: 4, high: 8, medium: 24, low: 72 },
    'parks-recreation': { critical: 12, high: 24, medium: 72, low: 336 },
    'public-safety': { critical: 1, high: 2, medium: 8, low: 24 },
    'maintenance': { critical: 8, high: 24, medium: 72, low: 336 },
    'environmental': { critical: 4, high: 12, medium: 48, low: 168 }
  };
  
  const hours = baseHours[departmentId]?.[priority] || 24;
  
  if (hours < 24) {
    return hours === 1 ? 'Within 1 hour' : `Within ${hours} hours`;
  } else if (hours < 168) {
    const days = Math.round(hours / 24);
    return days === 1 ? 'Within 1 day' : `Within ${days} days`;
  } else {
    const weeks = Math.round(hours / 168);
    return weeks === 1 ? 'Within 1 week' : `Within ${weeks} weeks`;
  }
}