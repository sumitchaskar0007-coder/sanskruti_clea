import React, { useState, useEffect } from 'react';
import { announcementsAPI, unwrapResponseList } from '../../api';

const AnnouncementAdmin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await announcementsAPI.getAll();
      setAnnouncements(unwrapResponseList(response));
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await announcementsAPI.update(editingId, formData);
      } else {
        await announcementsAPI.create(formData);
      }
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error('Error saving announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      isActive: announcement.isActive
    });
    setEditingId(announcement._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementsAPI.delete(id);
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      isActive: true
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20"> 
      {/* ⭐ ADDED TOP MARGIN (mt-20) */}
      
      <h1 className="text-3xl font-bold mb-8">Announcements Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Announcement' : 'Add New Announcement'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Announcements List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Announcements</h2>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="bg-white p-4 rounded-lg shadow">

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {announcement.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-gray-700">{announcement.content}</p>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnnouncementAdmin;
