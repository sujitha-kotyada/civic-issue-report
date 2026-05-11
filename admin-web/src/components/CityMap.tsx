import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Zap, AlertTriangle } from 'lucide-react';
import { type Issue } from '../data/mockData';

interface CityMapProps {
  filteredIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export function CityMap({ filteredIssues, onIssueClick }: CityMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Filter issues that have coordinates for map display
  const mapIssues = filteredIssues.filter(issue => issue.coordinates);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return AlertTriangle;
      case 'in-progress':
        return Zap;
      default:
        return MapPin;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Live City Map - Issue Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
          {/* Simplified map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            {/* City blocks representation */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gray-300 rounded opacity-50"></div>
            <div className="absolute top-10 right-10 w-16 h-24 bg-gray-300 rounded opacity-50"></div>
            <div className="absolute bottom-10 left-16 w-24 h-16 bg-gray-300 rounded opacity-50"></div>
            <div className="absolute bottom-10 right-20 w-18 h-18 bg-gray-300 rounded opacity-50"></div>
            
            {/* Roads */}
            <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-400 opacity-30"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-400 opacity-30"></div>
          </div>

          {/* Issue markers */}
          {mapIssues.map((issue) => {
            const Icon = getStatusIcon(issue.status);
            return (
              <div
                key={issue.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{
                  left: `${issue.coordinates!.x}%`,
                  top: `${issue.coordinates!.y}%`
                }}
                onClick={() => {
                  setSelectedMarker(issue.id);
                  onIssueClick(issue);
                }}
              >
                <div className={`w-4 h-4 rounded-full ${getPriorityColor(issue.priority)} border-2 border-white shadow-lg`}>
                  <Icon className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                {selectedMarker === issue.id && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg border min-w-48 z-10">
                    <p className="font-medium text-sm">{issue.title}</p>
                    <p className="text-xs text-gray-600">{issue.location}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {issue.ward.replace('ward-', 'Ward ').replace('ward-1', 'Ward 1').replace('ward-2', 'Ward 2').replace('ward-3', 'Ward 3').replace('ward-4', 'Ward 4')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}