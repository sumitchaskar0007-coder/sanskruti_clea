import React, { useEffect, useState } from 'react';
import { videosAPI, unwrapResponseList } from '../api';

const BACKEND_ORIGIN = import.meta.env.VITE_API_URL;

// Turn a stored path/URL into something the <img>/<video>/<iframe> can load directly
const resolveMediaUrl = (value) => {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${BACKEND_ORIGIN}${value}`;
};

const getEmbedUrl = (video) => {
  if (video.platform === 'youtube') {
    const match = video.videoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  }
  if (video.platform === 'vimeo') {
    const match = video.videoUrl.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    const id = match ? match[1] : null;
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
  }
  return null;
};

const PlaceholderThumb = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
    <svg className="h-12 w-12 text-white/70" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videosAPI.getAll();
        setVideos(unwrapResponseList(response));
      } catch (err) {
        console.error(err);
        setError('Unable to load videos right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const openVideo = (video) => setActiveVideo(video);
  const closeVideo = () => setActiveVideo(null);

  const renderPlayer = (video) => {
    const embedUrl = getEmbedUrl(video);
    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    // Direct file (uploaded or a direct .mp4/.webm link)
    return (
      <video
        src={resolveMediaUrl(video.videoUrl)}
        controls
        autoPlay
        className="w-full h-full bg-black"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Videos</h1>
        <p className="text-gray-500 mb-8">Watch highlights, events, and updates.</p>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-lg aspect-video" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && videos.length === 0 && (
          <p className="text-gray-500">No videos have been added yet.</p>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <button
                key={video._id}
                onClick={() => openVideo(video)}
                className="text-left bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={resolveMediaUrl(video.thumbnail)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <PlaceholderThumb />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                    <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow">
                      <svg className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PLAYER MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div
            className="bg-black rounded-lg overflow-hidden w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
              <h3 className="text-white font-medium truncate pr-4">{activeVideo.title}</h3>
              <button
                onClick={closeVideo}
                className="text-white/80 hover:text-white text-2xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="aspect-video">
              {renderPlayer(activeVideo)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;