import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, AlertTriangle, Clock, CheckCircle, Users } from 'lucide-react';
import { IssueDetailModal } from './IssueDetailModal';
import { mockNotifications, mockIssues, type Issue, type NotificationItem } from '../data/mockData';

export function Notifications() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleNotificationClick = (notification: NotificationItem) => {
    const issue = mockIssues.find(issue => issue.id === notification.issueId);
    if (issue) {
      setSelectedIssue(issue);
    }
  };

  const handleViewIssue = (issueId: string) => {
    const issue = mockIssues.find(issue => issue.id === issueId);
    if (issue) {
      setSelectedIssue(issue);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'escalation':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'community':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'resolution':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'escalation':
        return 'border-l-orange-500 bg-orange-50';
      case 'community':
        return 'border-l-blue-500 bg-blue-50';
      case 'resolution':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated on critical issues and system alerts</p>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`border-l-4 ${getNotificationColor(notification.type)} ${
              !notification.read ? 'ring-1 ring-blue-200' : ''
            } cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => handleNotificationClick(notification)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="default" className="ml-2 text-xs">New</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.timestamp}
                        <Badge variant="outline" className="ml-3 text-xs">
                          {notification.issueId}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewIssue(notification.issueId);
                      }}
                    >
                      View Issue
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}
    </div>
  );
}