import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { 
  Brain, 
  MapPin, 
  Clock, 
  Eye, 
  ArrowUp,
  AlertTriangle,
  Zap,
  Bot
} from 'lucide-react';
import { type Issue } from '../data/mockData';

interface PrioritizedIssuesListProps {
  filteredIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export function PrioritizedIssuesList({ filteredIssues, onIssueClick }: PrioritizedIssuesListProps) {
  // Sort issues by AI score (descending)
  const prioritizedIssues = [...filteredIssues]
    .filter(issue => issue.aiScore)
    .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'high':
        return <Zap className="w-4 h-4" />;
      default:
        return <ArrowUp className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Brain className="w-6 h-6 mr-2 text-blue-600" />
          AI-Prioritized Issues List
        </CardTitle>
        <p className="text-sm text-gray-600">
          Issues ranked by AI based on urgency, community impact, and department capacity
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Issue ID</TableHead>
                <TableHead className="min-w-48">Title & Description</TableHead>
                <TableHead>Location & Ward</TableHead>
                <TableHead className="w-40">Department Assignment</TableHead>
                <TableHead className="w-24">Priority</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32">Reported</TableHead>
                <TableHead className="w-20">AI Score</TableHead>
                <TableHead className="w-20">Upvotes</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prioritizedIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{issue.id}</TableCell>
                  <TableCell>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{issue.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{issue.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="truncate max-w-32">{issue.location}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {issue.ward.replace('ward-', 'Ward ').replace('1', '1').replace('2', '2').replace('3', '3').replace('4', '4')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{issue.assignedDepartment}</div>
                      <div className="text-xs text-gray-600">{issue.assignedOfficer}</div>
                      {issue.aiCategorization?.autoAssigned && (
                        <Badge variant="secondary" className="text-xs flex items-center w-fit">
                          <Bot className="w-3 h-3 mr-1" />
                          AI {issue.aiCategorization.confidence}%
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getPriorityColor(issue.priority)} flex items-center w-fit`}>
                      {getPriorityIcon(issue.priority)}
                      <span className="ml-1 capitalize">{issue.priority}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {issue.reportedAt}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Brain className="w-3 h-3 mr-1 text-blue-500" />
                      <span className="text-sm font-medium">{issue.aiScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                      <span className="text-sm">{issue.upvotes}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onIssueClick(issue)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* AI Categorization & Scoring Legend */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-blue-600" />
              AI Prioritization & Department Assignment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
              <div>
                <strong>Smart Categorization:</strong> AI analyzes issue content to automatically assign the most appropriate department based on keywords, urgency, and expertise.
              </div>
              <div>
                <strong>Confidence Scoring:</strong> Each assignment includes a confidence percentage showing how certain the AI is about the department match.
              </div>
              <div>
                <strong>Priority Calculation:</strong> Location impact (hospitals, schools), community engagement, and safety risks determine the AI priority score.
              </div>
              <div>
                <strong>Officer Assignment:</strong> Department workload and expertise automatically determine the assigned officer for optimal response time.
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span>AI Auto-Assigned Department</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>AI Priority Score (0-100)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Critical/High Priority Issues</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}