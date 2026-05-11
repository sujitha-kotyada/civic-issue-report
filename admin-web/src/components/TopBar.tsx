import { useState } from 'react';
import { Search, Bell, AlertTriangle, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Card, CardContent } from './ui/card';
import { mockNotifications, mockIssues } from '../data/mockData';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get urgent notifications (unread with type 'urgent' or 'escalation')
  const urgentNotifications = mockNotifications.filter(
    notification => !notification.read && (notification.type === 'urgent' || notification.type === 'escalation')
  );

  // Map notifications to urgentIssues format
  const urgentIssues = urgentNotifications.map(notification => {
    const issue = mockIssues.find(issue => issue.id === notification.issueId);
    return {
      id: notification.issueId,
      title: issue?.title || notification.title,
      priority: issue?.priority === 'critical' ? 'Critical' : 'High',
      deadline: notification.type === 'urgent' ? '2 hours' : '6 hours',
      location: issue?.location || 'Unknown',
    };
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Civic Issue Management</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          {/* Urgent Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {urgentIssues.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {urgentIssues.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-red-600 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Urgent Issues - AI Prioritized
                </h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {urgentIssues.map((issue) => (
                  <Card key={issue.id} className="m-2 border-l-4 border-l-red-500">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{issue.title}</p>
                          <p className="text-xs text-gray-600">{issue.location}</p>
                        </div>
                        <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-red-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Deadline: {issue.deadline}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}