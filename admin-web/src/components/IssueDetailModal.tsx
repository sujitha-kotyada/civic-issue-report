import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  MapPin, 
  User, 
  Clock, 
  Building, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  Camera
} from 'lucide-react';
import { IssueTimeline } from './IssueTimeline';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AICategorization } from './AICategorization';
import { type Issue } from '../data/mockData';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
}

export function IssueDetailModal({ issue, onClose }: IssueDetailModalProps) {
  const [uploadFile, setUploadFile] = useState(null);
  const [updateNote, setUpdateNote] = useState('');

  if (!issue) return null;

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
      case 'verified':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Additional analysis for display
  const additionalAnalysis = {
    estimatedCost: '$2,500 - $4,000',
    similarIssues: 3,
    communityImpact: 'High - affects school safety'
  };

  return (
    <Dialog open={!!issue} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Issue Details - {issue.id}</span>
            <Badge className={`${getPriorityColor(issue.priority)}`}>
              {issue.priority}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Issue Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{issue.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{issue.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Reported by {issue.reportedBy}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{issue.reportedAt}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{issue.ward}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {issue.upvotes} community upvotes
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    12 comments
                  </div>
                </div>

                {/* Issue Photo */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Reported Issue Photo
                  </h4>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <p className="text-gray-500">Issue photo would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Department Categorization */}
            <AICategorization issue={issue} />

            {/* Additional Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-blue-600" />
                  Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="font-medium text-sm">Estimated Cost:</label>
                  <p className="text-sm text-gray-700">{additionalAnalysis.estimatedCost}</p>
                </div>
                <div>
                  <label className="font-medium text-sm">Similar Issues Found:</label>
                  <p className="text-sm text-gray-700">{additionalAnalysis.similarIssues} in the past 30 days</p>
                </div>
                <div>
                  <label className="font-medium text-sm">Community Impact:</label>
                  <p className="text-sm text-gray-700">{additionalAnalysis.communityImpact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Upload Proof Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Resolution Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload File (Photo/Document)</label>
                  <Input 
                    type="file" 
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Update Note</label>
                  <Textarea 
                    placeholder="Describe the resolution or current status..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                  />
                </div>
                <Button className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Update
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Issue Timeline */}
            <IssueTimeline issueId={issue.id} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Escalate Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Reassign Department
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Reporter
                </Button>
              </CardContent>
            </Card>

            {/* Department Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Assigned to:</label>
                    <p className="text-sm">{issue.assignedDepartment}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Assigned Officer:</label>
                    <p className="text-sm">{issue.assignedOfficer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Resolution:</label>
                    <p className="text-sm">{issue.estimatedResolution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}