import { useState, useMemo } from 'react';
import { DashboardFilters } from './DashboardFilters';
import { StatsCards } from './StatsCards';
import { CityMap } from './CityMap';
import { RecentIssues } from './RecentIssues';
import { IssueDetailModal } from './IssueDetailModal';
import { PrioritizedIssuesList } from './PrioritizedIssuesList';
import { mockIssues, filterIssues, type Issue } from '../data/mockData';

export function Dashboard() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({
    ward: 'all',
    category: 'all', 
    priority: 'all',
    status: 'all'
  });

  // Filter issues based on current filter state
  const filteredIssues = useMemo(() => {
    return filterIssues(mockIssues, filters);
  }, [filters]);

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <DashboardFilters filters={filters} setFilters={setFilters} />
      
      {/* Stats Cards */}
      <StatsCards filteredIssues={filteredIssues} />
      
      {/* Map and Recent Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CityMap filteredIssues={filteredIssues} onIssueClick={setSelectedIssue} />
        </div>
        <div>
          <RecentIssues filteredIssues={filteredIssues} onIssueClick={setSelectedIssue} />
        </div>
      </div>
      
      {/* Prioritized Issues List */}
      <PrioritizedIssuesList filteredIssues={filteredIssues} onIssueClick={setSelectedIssue} />
      
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