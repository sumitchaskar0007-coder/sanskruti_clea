import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { videosAPI, unwrapResponseList } from '../../api';

const BACKEND_ORIGIN = import.meta.env.VITE_API_URL;

const resolveMediaUrl = (value) => {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${BACKEND_ORIGIN}${value}`;
};

const emptyForm = {
  title: '',
  description: '',
  videoType: 'url', // 'url' | 'upload'
  videoUrl: '',
  order: 0,
  isActive: true,
};

const VideosAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await videosAPI.getAllAdmin();
      setVideos(unwrapResponseList(response));
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setExistingThumbnail(null);
    setEditingId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (video) => {
    setForm({
      title: video.title || '',
      description: video.description || '',
      videoType: video.videoType || 'url',
      videoUrl: video.videoType === 'url' ? video.videoUrl || '' : '',
      order: video.order || 0,
      isActive: video.isActive !== false,
    });
    setEditingId(video._id);
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setExistingThumbnail(video.thumbnail || null);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0] || null);
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0] || null;
    setThumbnailFile(file);
    setThumbnailPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (form.videoType === 'url' && !form.videoUrl.trim()) {
      setError('Please paste a video URL.');
      return;
    }
    if (form.videoType === 'upload' && !editingId && !videoFile) {
      setError('Please choose a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title.trim());
    formData.append('description', form.description.trim());
    formData.append('videoType', form.videoType);
    formData.append('order', form.order || 0);
    formData.append('isActive', form.isActive);

    if (form.videoType === 'url') {
      formData.append('videoUrl', form.videoUrl.trim());
    }
    if (form.videoType === 'upload' && videoFile) {
      formData.append('video', videoFile);
    }
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    setSaving(true);
    try {
      if (editingId) {
        await videosAPI.update(editingId, formData);
      } else {
        await videosAPI.create(formData);
      }
      await fetchVideos();
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save video.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video? This cannot be undone.')) return;
    try {
      await videosAPI.delete(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete video.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-sm text-blue-600 hover:underline">
                &larr; Dashboard
              </Link>
              <h1 className="text-xl font-semibold">Manage Videos</h1>
            </div>
            <button
              onClick={openAddForm}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              + Add Video
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && !showForm && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-500">No videos yet. Click "Add Video" to create one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={resolveMediaUrl(video.thumbnail)}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No thumbnail</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate pr-2">{video.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        video.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {video.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                    {video.videoType === 'upload' ? 'Uploaded file' : `Link · ${video.platform}`}
                  </p>
                  {video.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{video.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(video)}
                      className="flex-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="flex-1 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= ADD/EDIT MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg my-8">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">
                {editingId ? 'Edit Video' : 'Add Video'}
              </h2>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>
              )}

              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* SOURCE TYPE TOGGLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="videoType"
                      value="url"
                      checked={form.videoType === 'url'}
                      onChange={handleChange}
                    />
                    Link / URL (YouTube, Vimeo, direct link)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="videoType"
                      value="upload"
                      checked={form.videoType === 'upload'}
                      onChange={handleChange}
                    />
                    Upload file
                  </label>
                </div>
              </div>

              {/* URL INPUT */}
              {form.videoType === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=... or any direct video link"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Works with YouTube, Vimeo, or any direct .mp4/.webm link. A thumbnail is
                    fetched automatically for YouTube/Vimeo when you don't upload one below.
                  </p>
                </div>
              )}

              {/* FILE INPUT */}
              {form.videoType === 'upload' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video File {editingId ? '' : '*'}
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    className="w-full text-sm"
                  />
                  {editingId && (
                    <p className="text-xs text-gray-400 mt-1">
                      Leave empty to keep the currently uploaded video.
                    </p>
                  )}
                </div>
              )}

              {/* THUMBNAIL (OPTIONAL, ALWAYS AVAILABLE) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Thumbnail (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="w-full text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  If left empty, a default thumbnail is used for uploads, and an automatic
                  thumbnail is fetched for YouTube/Vimeo links.
                </p>
                {(thumbnailPreview || existingThumbnail) && (
                  <img
                    src={thumbnailPreview || resolveMediaUrl(existingThumbnail)}
                    alt="Thumbnail preview"
                    className="mt-2 h-24 rounded border object-cover"
                  />
                )}
              </div>

              {/* ORDER + ACTIVE */}
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm mt-6">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                  Visible on site
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosAdmin;