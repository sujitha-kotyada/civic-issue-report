// Mock data for the civic issue management system
import { categorizeIssueDepartment, calculateAIScore, assignOfficer, estimateResolutionTime } from '../utils/aiCategorization';

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  ward: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'resolved' | 'verified';
  reportedBy: string;
  reportedAt: string;
  reportedAtTimestamp: Date;
  upvotes: number;
  aiScore?: number;
  coordinates?: { x: number; y: number };
  assignedDepartment?: string;
  assignedDepartmentId?: string;
  assignedOfficer?: string;
  estimatedResolution?: string;
  aiCategorization?: {
    confidence: number;
    reasoning: string[];
    autoAssigned: boolean;
  };
}

// Function to create an issue with AI categorization
function createIssueWithAI(issueData: Omit<Issue, 'aiScore' | 'assignedDepartment' | 'assignedDepartmentId' | 'assignedOfficer' | 'estimatedResolution' | 'aiCategorization'>): Issue {
  const aiResult = categorizeIssueDepartment(
    issueData.title,
    issueData.description,
    issueData.category,
    issueData.location
  );
  
  const aiScore = calculateAIScore(
    issueData.title,
    issueData.description,
    issueData.category,
    issueData.priority,
    issueData.location,
    issueData.upvotes
  );
  
  const assignedOfficer = assignOfficer(aiResult.department.id);
  const estimatedResolution = estimateResolutionTime(aiResult.department.id, issueData.priority);
  
  return {
    ...issueData,
    aiScore,
    assignedDepartment: aiResult.department.name,
    assignedDepartmentId: aiResult.department.id,
    assignedOfficer,
    estimatedResolution,
    aiCategorization: {
      confidence: aiResult.confidence,
      reasoning: aiResult.reasoning,
      autoAssigned: true
    }
  };
}

// Base issue data without AI assignments
const baseIssues = [
  {
    id: 'CIV-001',
    title: 'Water main burst near hospital',
    description: 'Major water line rupture causing flooding near emergency services. Multiple vehicles affected.',
    location: 'Medical District, Main St & Hospital Ave',
    ward: 'ward-1',
    category: 'utilities',
    priority: 'critical' as const,
    status: 'pending' as const,
    reportedBy: 'Emergency Services',
    reportedAt: '15 minutes ago',
    reportedAtTimestamp: new Date(Date.now() - 15 * 60 * 1000),
    upvotes: 34,
    coordinates: { x: 20, y: 15 }
  },
  {
    id: 'CIV-045',
    title: 'Traffic light malfunction at school crossing',
    description: 'Traffic signal not working properly during school hours, creating safety hazard for children.',
    location: 'School Zone, Oak Ave & Pine St',
    ward: 'ward-2',
    category: 'traffic',
    priority: 'high' as const,
    status: 'in-progress' as const,
    reportedBy: 'School Principal',
    reportedAt: '2 hours ago',
    reportedAtTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    upvotes: 28,
    coordinates: { x: 60, y: 30 }
  },
  {
    id: 'CIV-089',
    title: 'Large pothole damaging vehicles',
    description: 'Deep pothole on main thoroughfare causing tire damage to multiple vehicles.',
    location: 'Downtown, 5th Street & Broadway',
    ward: 'ward-1',
    category: 'infrastructure',
    priority: 'high' as const,
    status: 'pending' as const,
    reportedBy: 'City Resident',
    reportedAt: '4 hours ago',
    reportedAtTimestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    upvotes: 22,
    coordinates: { x: 40, y: 60 }
  },
  {
    id: 'CIV-123',
    title: 'Garbage overflow at park entrance',
    description: 'Multiple trash bins overflowing, creating unsanitary conditions near children\'s playground.',
    location: 'Central Park, Main Entrance',
    ward: 'ward-3',
    category: 'sanitation',
    priority: 'medium' as const,
    status: 'resolved' as const,
    reportedBy: 'Park Visitor',
    reportedAt: '8 hours ago',
    reportedAtTimestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    upvotes: 15,
    coordinates: { x: 75, y: 80 }
  },
  {
    id: 'CIV-156',
    title: 'Broken streetlight in commercial area',
    description: 'Street lighting not working, affecting visibility and security in busy commercial zone.',
    location: 'Business District, Pine St & Commerce Ave',
    ward: 'ward-3',
    category: 'utilities',
    priority: 'medium' as const,
    status: 'pending' as const,
    reportedBy: 'Business Owner',
    reportedAt: '6 hours ago',
    reportedAtTimestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    upvotes: 12,
    coordinates: { x: 85, y: 45 }
  },
  {
    id: 'CIV-167',
    title: 'Missed garbage collection for 3 days',
    description: 'Residential area has not had garbage pickup for 3 consecutive days, waste accumulating.',
    location: 'Residential Area, Elm St',
    ward: 'ward-4',
    category: 'sanitation',
    priority: 'medium' as const,
    status: 'pending' as const,
    reportedBy: 'Resident Association',
    reportedAt: '1 day ago',
    reportedAtTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    upvotes: 18,
    coordinates: { x: 30, y: 90 }
  },
  {
    id: 'CIV-178',
    title: 'Graffiti on public building',
    description: 'Vandalism affecting the appearance of city hall exterior walls.',
    location: 'City Hall, Center St',
    ward: 'ward-1',
    category: 'public-safety',
    priority: 'low' as const,
    status: 'pending' as const,
    reportedBy: 'City Employee',
    reportedAt: '2 days ago',
    reportedAtTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    upvotes: 7,
    coordinates: { x: 50, y: 50 }
  },
  {
    id: 'CIV-182',
    title: 'Park bench damage needs repair',
    description: 'Broken bench slats creating safety hazard and reducing park amenities.',
    location: 'Riverside Park, Bench Area 3',
    ward: 'ward-2',
    category: 'infrastructure',
    priority: 'low' as const,
    status: 'in-progress' as const,
    reportedBy: 'Park User',
    reportedAt: '3 days ago',
    reportedAtTimestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    upvotes: 4,
    coordinates: { x: 70, y: 20 }
  },
  {
    id: 'CIV-190',
    title: 'Sidewalk crack creating trip hazard',
    description: 'Large crack in sidewalk near shopping center causing pedestrian safety concern.',
    location: 'Shopping District, Mall Entrance',
    ward: 'ward-4',
    category: 'infrastructure',
    priority: 'high' as const,
    status: 'pending' as const,
    reportedBy: 'Mall Security',
    reportedAt: '1 hour ago',
    reportedAtTimestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    upvotes: 9,
    coordinates: { x: 90, y: 70 }
  },
  {
    id: 'CIV-195',
    title: 'Dog park fence damaged',
    description: 'Section of dog park fencing is broken, potential safety issue for pets.',
    location: 'Community Park, Dog Run Area',
    ward: 'ward-3',
    category: 'infrastructure',
    priority: 'medium' as const,
    status: 'resolved' as const,
    reportedBy: 'Dog Owner',
    reportedAt: '5 hours ago',
    reportedAtTimestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    upvotes: 6,
    coordinates: { x: 15, y: 85 }
  }
];

// Apply AI categorization to all issues
export const mockIssues: Issue[] = baseIssues.map(createIssueWithAI);

// Notification data linked to issues
export interface NotificationItem {
  id: number;
  type: 'urgent' | 'escalation' | 'community' | 'resolution';
  title: string;
  message: string;
  timestamp: string;
  issueId: string;
  read: boolean;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'urgent',
    title: 'Critical Issue Requires Immediate Action',
    message: 'Water main burst near hospital - 2 hour deadline approaching',
    timestamp: '5 minutes ago',
    issueId: 'CIV-001',
    read: false
  },
  {
    id: 2,
    type: 'escalation',
    title: 'Issue Escalated to Higher Authority',
    message: 'Traffic light malfunction unresolved for 6 hours',
    timestamp: '1 hour ago',
    issueId: 'CIV-045',
    read: false
  },
  {
    id: 3,
    type: 'community',
    title: 'High Community Engagement',
    message: 'Pothole issue received 25+ upvotes in 2 hours',
    timestamp: '2 hours ago',
    issueId: 'CIV-089',
    read: true
  },
  {
    id: 4,
    type: 'resolution',
    title: 'Issue Marked as Resolved',
    message: 'Garbage overflow issue has been resolved by sanitation team',
    timestamp: '4 hours ago',
    issueId: 'CIV-123',
    read: true
  },
  {
    id: 5,
    type: 'urgent',
    title: 'New High Priority Issue',
    message: 'Sidewalk safety hazard reported at shopping center',
    timestamp: '30 minutes ago',
    issueId: 'CIV-190',
    read: false
  }
];

// Utility functions for filtering and stats
export const filterIssues = (issues: Issue[], filters: {
  ward: string;
  category: string;
  priority: string;
  status: string;
}) => {
  return issues.filter(issue => {
    if (filters.ward !== 'all' && issue.ward !== filters.ward) return false;
    if (filters.category !== 'all' && issue.category !== filters.category) return false;
    if (filters.priority !== 'all' && issue.priority !== filters.priority) return false;
    if (filters.status !== 'all' && issue.status !== filters.status) return false;
    return true;
  });
};

export const calculateStats = (issues: Issue[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return {
    total: issues.length,
    open: issues.filter(issue => issue.status === 'pending').length,
    inProgress: issues.filter(issue => issue.status === 'in-progress').length,
    resolvedToday: issues.filter(issue => {
      const issueDate = new Date(issue.reportedAtTimestamp);
      return issue.status === 'resolved' && issueDate >= today;
    }).length
  };
};