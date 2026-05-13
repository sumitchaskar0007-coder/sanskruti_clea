import React, { useState, useEffect } from 'react';
import { careersAPI, unwrapResponseList } from '../api';
import Navbar from '../components/Navbar'; // import navbar

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: 'all',
    location: 'all',
    search: ''
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    filterCareers();
  }, [careers, filters]);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await careersAPI.getAll();
      const list = unwrapResponseList(response);
      const activeCareers = list.filter(career => career.isActive);
      setCareers(activeCareers);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCareers = () => {
    let filtered = [...careers];

    if (filters.department !== 'all') {
      filtered = filtered.filter(job => 
        job.department?.toLowerCase() === filters.department.toLowerCase()
      );
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter(job => 
        job.location?.toLowerCase() === filters.location.toLowerCase()
      );
    }
    if (filters.search.trim() !== '') {
      const term = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.position.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.requirements?.some(req => req.toLowerCase().includes(term))
      );
    }
    setFilteredCareers(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApply = (jobId) => {
    alert(`Application process for job ID: ${jobId}`);
  };

  const getUniqueValues = (key) => {
    const values = careers.map(job => job[key]).filter(Boolean);
    return ['all', ...new Set(values)];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Add top margin to push content below fixed navbar */}
      <div className="mt-[80px] min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Careers at Jadhavar International
            </h1>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Join our team of dedicated educators and staff to shape the future of young minds
            </p>
            <div className="mt-6 text-sm text-blue-500">
              Currently {careers.length} open position{careers.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search positions or keywords..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <svg className="absolute left-3 top-3.5 h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Departments</option>
                  {getUniqueValues('department').slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Locations</option>
                  {getUniqueValues('location').slice(1).map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-500">Loading career opportunities...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCareers.length > 0 ? filteredCareers.map((job) => (
                <div key={job._id} className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-900 mb-1">{job.position}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.department && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">{job.department}</span>}
                          {job.location && <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">📍 {job.location}</span>}
                          {job.salary && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">💰 {job.salary}</span>}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Open</span>
                    </div>
                    <p className="text-blue-700 mb-4 line-clamp-3">{job.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                      <span className="text-sm text-blue-500">Posted: {formatDate(job.createdAt)}</span>
                      <div className="flex gap-3">
                        <button onClick={() => handleViewDetails(job)} className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">View Details</button>
                        <button onClick={() => handleApply(job._id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Apply Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-blue-200 col-span-2">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-2">No job openings found</h3>
                  <p className="text-blue-500">
                    {filters.search || filters.department !== 'all' || filters.location !== 'all'
                      ? 'No positions match your current filters'
                      : 'We currently have no open positions. Please check back later.'}
                  </p>
                  {(filters.search || filters.department !== 'all' || filters.location !== 'all') && (
                    <button onClick={() => setFilters({ department: 'all', location: 'all', search: '' })}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Career;
