import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, Clock, CheckCircle, Calendar } from 'lucide-react';
import { calculateStats, type Issue } from '../data/mockData';

interface StatsCardsProps {
  filteredIssues: Issue[];
}

export function StatsCards({ filteredIssues }: StatsCardsProps) {
  // Calculate stats from filtered issues
  const stats = calculateStats(filteredIssues);

  const statCards = [
    {
      title: 'Total Issues',
      value: stats.total,
      icon: AlertTriangle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Open Issues',
      value: stats.open,
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Resolved Today',
      value: stats.resolvedToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
              {stat.title === 'Open Issues' && stat.value > 400 && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  High Load
                </Badge>
              )}
              {stat.title === 'Resolved Today' && (
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last updated: 2 min ago
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}