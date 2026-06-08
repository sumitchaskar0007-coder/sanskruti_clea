import React, { useState, useEffect } from 'react';
import { galleryAPI, unwrapResponseList } from '../../api';

const GalleryAdmin = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      const items = unwrapResponseList(response);
      setGalleryItems(items);
      setError(null);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to fetch gallery items. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      if (e.target.files[0]) {
        setFormData({ ...formData, image: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    if (!editingId && !formData.image) {
      setError('Image is required for new gallery items');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title.trim());
    data.append('description', formData.description.trim());
    data.append('category', formData.category.trim());
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingId) {
        await galleryAPI.update(editingId, data);
        setSuccess('Gallery item updated successfully!');
      } else {
        await galleryAPI.create(data);
        setSuccess('Gallery item added successfully!');
      }
      resetForm();
      await fetchGalleryItems();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setError(error.response?.data?.error || 'Failed to save gallery item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category || '',
      image: null
    });
    setEditingId(item._id);
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        setLoading(true);
        await galleryAPI.delete(id);
        setSuccess('Gallery item deleted successfully!');
        await fetchGalleryItems();
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setError('Failed to delete gallery item. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: null
    });
    setEditingId(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>

      {/* Success and Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {editingId ? 'New Image (Leave empty to keep current)' : 'Image *'}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="mt-1 block w-full p-2 border rounded"
                />
                {editingId && formData.image && (
                  <p className="text-sm text-green-600 mt-1">New image selected</p>
                )}
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

        {/* Gallery List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Gallery Items ({galleryItems.length})</h2>
          {loading && !galleryItems.length ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
              {galleryItems.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No gallery items found. Add your first image above!
                </div>
              ) : (
                galleryItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      {item.category && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mt-2">
                          {item.category}
                        </span>
                      )}
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;