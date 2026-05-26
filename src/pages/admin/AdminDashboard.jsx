import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* GALLERY CARD */}
            <Link to="/admin/gallery" className="bg-white shadow rounded-lg hover:shadow-lg transition">
              <div className="p-6 flex items-center">
                <div className="bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Gallery</p>
                  <p className="text-lg font-semibold">Manage Images</p>
                </div>
              </div>
            </Link>

            {/* ANNOUNCEMENTS CARD */}
            <Link to="/admin/announcements" className="bg-white shadow rounded-lg hover:shadow-lg transition">
              <div className="p-6 flex items-center">
                <div className="bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Announcements</p>
                  <p className="text-lg font-semibold">Manage Notices</p>
                </div>
              </div>
            </Link>

            {/* CAREERS CARD */}
            <Link to="/admin/careers" className="bg-white shadow rounded-lg hover:shadow-lg transition">
              <div className="p-6 flex items-center">
                <div className="bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Careers</p>
                  <p className="text-lg font-semibold">Job Postings</p>
                </div>
              </div>
            </Link>

            {/* BLOG CARD (NEW) */}
            <Link to="/admin/blog" className="bg-white shadow rounded-lg hover:shadow-lg transition">
              <div className="p-6 flex items-center">
                <div className="bg-orange-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Blog</p>
                  <p className="text-lg font-semibold">Manage Blogs</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
