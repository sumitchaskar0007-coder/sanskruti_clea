// frontend/src/components/admin/VideoModal.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api';
import { FaUpload, FaLink, FaTimes } from 'react-icons/fa';

const VideoModal = ({ video, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoType: 'url',
    videoUrl: '',
    isActive: true,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || '',
        description: video.description || '',
        videoType: video.videoType || 'url',
        videoUrl: video.videoUrl || '',
        isActive: video.isActive !== undefined ? video.isActive : true,
      });
      setVideoPreview(video.videoUrl || '');
    }
  }, [video]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setFormData({
        ...formData,
        videoType: 'upload',
        videoUrl: URL.createObjectURL(file),
      });
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('videoType', formData.videoType);
      formDataToSend.append('isActive', formData.isActive);
      
      if (formData.videoType === 'url') {
        formDataToSend.append('videoUrl', formData.videoUrl);
      } else if (formData.videoType === 'upload' && videoFile) {
        formDataToSend.append('video', videoFile);
      }

      if (thumbnailFile) {
        formDataToSend.append('thumbnail', thumbnailFile);
      }

      let response;
      if (video) {
        // Update existing video
        response = await API.put(`/api/videos/${video._id}`, formDataToSend);
      } else {
        // Create new video
        response = await API.post('/api/videos', formDataToSend);
      }

      if (response.data && response.data.success) {
        onSave(response.data.video);
      } else {
        throw new Error('Failed to save video');
      }
    } catch (error) {
      console.error('Error saving video:', error);
      setError(error.response?.data?.message || error.message || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {video ? 'Edit Video' : 'Add New Video'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter video description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Source
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, videoType: 'url', videoUrl: '' })}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                  formData.videoType === 'url'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FaLink className="inline mr-2" />
                URL
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, videoType: 'upload', videoUrl: '' })}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                  formData.videoType === 'upload'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FaUpload className="inline mr-2" />
                Upload
              </button>
            </div>
          </div>

          {formData.videoType === 'url' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL *
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Supports YouTube, Vimeo, and direct video URLs
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Video *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                  id="video-upload"
                  required={!video}
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer block"
                >
                  <FaUpload className="text-gray-400 text-3xl mx-auto mb-2" />
                  <span className="text-gray-600">
                    {videoFile ? videoFile.name : 'Click to upload video'}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    MP4, WebM, OGG, AVI, MOV (Max 100MB)
                  </p>
                </label>
              </div>
            </div>
          )}

          {videoPreview && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
              <video
                src={videoPreview}
                className="w-full max-h-[200px] rounded-lg object-contain"
                controls
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer block"
              >
                <FaUpload className="text-gray-400 text-2xl mx-auto mb-2" />
                <span className="text-gray-600">
                  {thumbnailFile ? thumbnailFile.name : 'Click to upload thumbnail'}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG, GIF, WebP (Recommended: 16:9 ratio)
                </p>
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Active (visible to public)
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : video ? 'Update Video' : 'Add Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoModal;