import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { type Issue } from '../data/mockData';

interface RecentIssuesProps {
  filteredIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export function RecentIssues({ filteredIssues, onIssueClick }: RecentIssuesProps) {
  // Sort by most recent and take top 5
  const recentIssues = [...filteredIssues]
    .sort((a, b) => b.reportedAtTimestamp.getTime() - a.reportedAtTimestamp.getTime())
    .slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Issues & Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-3 p-4">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onIssueClick(issue)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{issue.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{issue.description}</p>
                  </div>
                  <Badge className={`ml-2 text-xs ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </Badge>
                </div>

                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="mr-3">{issue.location}</span>
                  <User className="w-3 h-3 mr-1" />
                  <span>{issue.reportedBy}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {issue.upvotes} upvotes
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {issue.reportedAt}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIssueClick(issue);
                  }}
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}