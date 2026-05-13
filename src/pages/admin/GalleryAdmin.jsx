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

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryAPI.getAll();
      setGalleryItems(unwrapResponseList(response));
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingId) {
        await galleryAPI.update(editingId, data);
      } else {
        await galleryAPI.create(data);
      }
      resetForm();
      fetchGalleryItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
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
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await galleryAPI.delete(id);
        fetchGalleryItems();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
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
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24"> {/* Added margin here */}
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>

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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  required={!editingId}
                  className="mt-1 block w-full"
                />
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
          <h2 className="text-xl font-semibold mb-4">Gallery Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
               <img
  src={item.imageUrl}
  alt={item.title}
  className="w-full h-48 object-cover"
/>


                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>

                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryAdmin;
