import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Download, 
  Trash2, 
  SlidersHorizontal,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/formatters';

export default function ProjectHistoryPage({ 
  projects = [], 
  onSelectProject, 
  onNavigate, 
  onDeleteProject,
  initialSearch = '' 
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sourceTypeFilter, setSourceTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesSource = p.source_name?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesSource) return false;
      }

      // Source type filter
      if (sourceTypeFilter !== 'ALL') {
        if (p.source_type !== sourceTypeFilter.toLowerCase()) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL') {
        if (p.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      // Date filter
      if (dateFilter === 'TODAY') {
        const today = new Date().toDateString();
        if (new Date(p.created_at).toDateString() !== today) return false;
      } else if (dateFilter === '7DAYS') {
        const sevenDaysAgo = Date.now() - 7 * 86400000;
        if (new Date(p.created_at).getTime() < sevenDaysAgo) return false;
      }

      return true;
    });
  }, [projects, searchTerm, sourceTypeFilter, statusFilter, dateFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSourceTypeFilter('ALL');
    setStatusFilter('ALL');
    setDateFilter('ALL');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-neutral">Institutional Repository</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Archived Records & Transformations</span>
          </div>
          <h1 className="page-title">Project History</h1>
          <p className="page-subtitle">
            Auditable archive of all processed administrative documents, circulars, and derived multi-channel artifacts.
          </p>
        </div>

        <button 
          className="btn btn-accent"
          onClick={() => onNavigate('create')}
        >
          + New Transformation
        </button>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px' }}
              placeholder="Filter by title, keywords, circular number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Source Type Filter */}
          <div style={{ minWidth: '150px' }}>
            <select 
              className="form-select"
              value={sourceTypeFilter}
              onChange={(e) => setSourceTypeFilter(e.target.value)}
              aria-label="Filter by source type"
            >
              <option value="ALL">All Source Types</option>
              <option value="DOCUMENT">Document (PDF/DOCX)</option>
              <option value="TEXT">Text Input</option>
              <option value="IMAGE">Image / Scan</option>
              <option value="VIDEO">Video Recording</option>
              <option value="URL">Web URL</option>
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ minWidth: '140px' }}>
            <select 
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="VERIFIED">Verified</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>

          {/* Date Filter */}
          <div style={{ minWidth: '140px' }}>
            <select 
              className="form-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter by date range"
            >
              <option value="ALL">All Dates</option>
              <option value="TODAY">Today</option>
              <option value="7DAYS">Past 7 Days</option>
            </select>
          </div>

          {(searchTerm || sourceTypeFilter !== 'ALL' || statusFilter !== 'ALL' || dateFilter !== 'ALL') && (
            <button 
              className="btn btn-outline btn-sm" 
              onClick={resetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Projects Table / Cards */}
      {filteredProjects.length === 0 ? (
        <div className="card text-center" style={{ padding: '48px' }}>
          <Search size={40} color="var(--text-dim)" style={{ margin: '0 auto 12px' }} />
          <h3>No matching projects found</h3>
          <p className="text-muted" style={{ margin: '6px 0 16px' }}>
            Try adjusting your search keywords or filter criteria.
          </p>
          <button className="btn btn-outline btn-sm" onClick={resetFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)' }}>
              Showing {filteredProjects.length} archived transformations
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-alt)', borderBottom: '1px solid var(--border-default)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 18px' }}>Project Name & Category</th>
                  <th style={{ padding: '12px 18px' }}>Source Type</th>
                  <th style={{ padding: '12px 18px' }}>Created Date</th>
                  <th style={{ padding: '12px 18px' }}>Outputs Generated</th>
                  <th style={{ padding: '12px 18px' }}>Status</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr 
                    key={p.id} 
                    style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem', transition: 'background 0.15s' }}
                    className="history-row"
                  >
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Category: <strong>{p.category || 'General Administration'}</strong>
                      </div>
                    </td>

                    <td style={{ padding: '16px 18px' }}>
                      <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                        {p.source_format || p.source_type}
                      </span>
                    </td>

                    <td style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {formatDate(p.created_at)}
                    </td>

                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {p.selected_formats?.map((fmt, i) => (
                          <span key={i} className="badge badge-neutral" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                            {fmt.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td style={{ padding: '16px 18px' }}>
                      <StatusBadge status={p.status || 'Completed'} size="sm" />
                    </td>

                    <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            onSelectProject(p);
                            onNavigate('project-details', { projectId: p.id });
                          }}
                          title="View project metadata & audit log"
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            onSelectProject(p);
                            onNavigate('outputs');
                          }}
                          title="Open generated communication artifacts"
                        >
                          Open <ArrowRight size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
