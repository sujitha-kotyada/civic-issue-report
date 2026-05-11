import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

export function Analytics() {
  const issuesByCategory = [
    { name: 'Infrastructure', value: 35, color: '#8884d8' },
    { name: 'Utilities', value: 25, color: '#82ca9d' },
    { name: 'Traffic', value: 20, color: '#ffc658' },
    { name: 'Sanitation', value: 15, color: '#ff7300' },
    { name: 'Public Safety', value: 5, color: '#00c49f' }
  ];

  const resolutionTrend = [
    { month: 'Jan', resolved: 120, reported: 140 },
    { month: 'Feb', resolved: 135, reported: 155 },
    { month: 'Mar', resolved: 150, reported: 160 },
    { month: 'Apr', resolved: 145, reported: 170 },
    { month: 'May', resolved: 160, reported: 175 },
    { month: 'Jun', resolved: 170, reported: 180 }
  ];

  const departmentPerformance = [
    { department: 'Public Works', avgResolution: 2.5, issuesHandled: 156 },
    { department: 'Utilities', avgResolution: 1.8, issuesHandled: 89 },
    { department: 'Transportation', avgResolution: 3.2, issuesHandled: 134 },
    { department: 'Sanitation', avgResolution: 1.2, issuesHandled: 78 },
    { department: 'Public Safety', avgResolution: 4.1, issuesHandled: 45 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Performance insights and trends analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Resolution Time</p>
                <p className="text-2xl font-bold text-blue-600">2.4 days</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">-0.3 days from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Citizen Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600">4.6/5</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+0.2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Escalated Issues</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">-5 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issuesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {issuesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resolution Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reported" stroke="#8884d8" name="Reported" />
                <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgResolution" fill="#8884d8" name="Avg Resolution Time (days)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}