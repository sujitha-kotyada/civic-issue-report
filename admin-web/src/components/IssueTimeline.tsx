import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Settings, 
  CheckCircle, 
  Upload
} from 'lucide-react';

interface IssueTimelineProps {
  issueId: string;
}

export function IssueTimeline({ issueId }: IssueTimelineProps) {
  // Mock timeline data
  const timelineEvents = [
    {
      id: 1,
      title: 'Issue Reported',
      description: 'Citizen reported the issue with photo evidence',
      timestamp: '2024-01-15 09:30 AM',
      type: 'created',
      icon: AlertTriangle,
      status: 'completed'
    },
    {
      id: 2,
      title: 'AI Analysis Completed',
      description: 'System analyzed and categorized the issue as high priority',
      timestamp: '2024-01-15 09:32 AM',
      type: 'analysis',
      icon: Settings,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Department Assigned',
      description: 'Assigned to Transportation & Public Works Department',
      timestamp: '2024-01-15 10:15 AM',
      type: 'assignment',
      icon: UserCheck,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Work in Progress',
      description: 'Field team dispatched to location for assessment',
      timestamp: '2024-01-15 02:30 PM',
      type: 'progress',
      icon: Clock,
      status: 'current'
    },
    {
      id: 5,
      title: 'Resolution Pending',
      description: 'Awaiting completion and proof of resolution',
      timestamp: 'Pending',
      type: 'resolution',
      icon: Upload,
      status: 'pending'
    },
    {
      id: 6,
      title: 'Citizen Verification',
      description: 'Community verification of resolution required',
      timestamp: 'Pending',
      type: 'verification',
      icon: CheckCircle,
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'current':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-400 bg-gray-100';
      default:
        return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Issue Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === timelineEvents.length - 1;
            
            return (
              <div key={event.id} className="relative flex items-start space-x-3">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200"></div>
                )}
                
                {/* Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getIconColor(event.status)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}