import React, { useState, useEffect } from 'react';
import { announcementsAPI, unwrapResponseList } from '../api';
import { Helmet } from "react-helmet-async";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, archived
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, filter, searchTerm]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementsAPI.getAll();
      setAnnouncements(unwrapResponseList(response));
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    // Status filter
    if (filter === 'active') filtered = filtered.filter(a => a.isActive);
    if (filter === 'archived') filtered = filtered.filter(a => !a.isActive);

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(term) || a.content.toLowerCase().includes(term)
      );
    }

    setFilteredAnnouncements(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) return 'Today';
    if (diffInHours < 48) return 'Yesterday';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">
      {/* SEO */}
      <Helmet>
        <title>Announcements - Jadhavar International</title>
        <meta name="description" content="Stay updated with the latest announcements, news, and important information from Jadhavar International School." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Announcements
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Stay updated with the latest news and important information from Jadhavar International School.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({announcements.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({announcements.filter(a => a.isActive).length})
              </button>
              <button
                onClick={() => setFilter('archived')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'archived' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Archived ({announcements.filter(a => !a.isActive).length})
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-700">Loading announcements...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Announcements List */}
            {filteredAnnouncements.length > 0 ? (
              <div className="space-y-6">
                {filteredAnnouncements.map((a) => (
                  <div
                    key={a._id}
                    className={`bg-white rounded-xl shadow border transition-all duration-300 hover:shadow-lg ${
                      a.isActive ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-gray-400 opacity-80'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-blue-900">{a.title}</h2>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              a.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {a.isActive ? 'Active' : 'Archived'}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-blue-700 mb-4">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(a.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {getTimeAgo(a.date)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="prose max-w-none text-blue-800">
                        <p className="whitespace-pre-line leading-relaxed">{a.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow border border-gray-200">
                <div className="text-blue-200 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">No announcements found</h3>
                <p className="text-blue-500 mb-6">
                  {searchTerm
                    ? `No announcements matching "${searchTerm}"`
                    : filter === 'active'
                      ? 'No active announcements at the moment'
                      : filter === 'archived'
                        ? 'No archived announcements'
                        : 'No announcements available'}
                </p>
                {(searchTerm || filter !== 'all') && (
                  <button
                    onClick={() => { setSearchTerm(''); setFilter('all'); }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All Announcements
                  </button>
                )}
              </div>
            )}

            {/* Stats */}
            {announcements.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-700">{announcements.length}</div>
                  <div className="text-blue-600 font-medium">Total Announcements</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-700">{announcements.filter(a => a.isActive).length}</div>
                  <div className="text-green-600 font-medium">Active</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-700">{announcements.filter(a => !a.isActive).length}</div>
                  <div className="text-gray-600 font-medium">Archived</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-700">{filteredAnnouncements.length}</div>
                  <div className="text-purple-600 font-medium">Currently Showing</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Announcements;
