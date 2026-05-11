import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { type Issue } from '../data/mockData';

interface AICategorization {
  issue: Issue;
}

export function AICategorization({ issue }: AICategorization) {
  if (!issue.aiCategorization) return null;

  const { confidence, reasoning, autoAssigned } = issue.aiCategorization;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 85) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (confidence >= 70) return <Brain className="w-4 h-4 text-blue-600" />;
    if (confidence >= 50) return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 85) return 'High Confidence';
    if (confidence >= 70) return 'Good Confidence';
    if (confidence >= 50) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-base">AI Department Categorization</CardTitle>
          {autoAssigned && (
            <Badge variant="secondary" className="text-xs">
              Auto-Assigned
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Department Assignment */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-sm">Assigned Department</p>
            <p className="text-sm text-gray-600">{issue.assignedDepartment}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">Assigned Officer</p>
            <p className="text-sm text-gray-600">{issue.assignedOfficer}</p>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="flex items-center space-x-3">
          {getConfidenceIcon(confidence)}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{getConfidenceLabel(confidence)}</span>
              <Badge variant="outline" className={`${getConfidenceColor(confidence)}`}>
                {confidence}%
              </Badge>
            </div>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  confidence >= 85 ? 'bg-green-500' :
                  confidence >= 70 ? 'bg-blue-500' :
                  confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />
            Analysis Reasoning
          </h4>
          <ul className="space-y-1">
            {reasoning.map((reason, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Resolution Estimate */}
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Clock className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-800">Estimated Resolution</p>
            <p className="text-sm text-blue-600">{issue.estimatedResolution}</p>
          </div>
        </div>

        {/* AI Score */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>AI Priority Score: {issue.aiScore}/100</span>
          <span>Auto-categorized by Municipal AI</span>
        </div>
      </CardContent>
    </Card>
  );
}