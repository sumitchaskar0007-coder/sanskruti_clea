import React, { useState, useEffect } from 'react';
import { galleryAPI, unwrapResponseList } from '../api';
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      const items = unwrapResponseList(response);
      setGalleryItems(items);

      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(items
        .map(item => item.category)
        .filter(category => category && category.trim() !== '')
      )];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">
      {/* SEO */}
      <Helmet>
        <title>Gallery - Jadhavar International School</title>
        <meta name="description" content="Explore our photo gallery showcasing the best moments and events from Jadhavar International School & Jr. College. Discover our categories and memorable events." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Our Photo Gallery
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Explore memorable moments, events, and activities at Jadhavar International School & Jr. College
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              {category === 'all' ? 'All Photos' : category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                     <img
  src={item.imageUrl}
  alt={item.title}
  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
  loading="lazy"
/>

                    </div>
                    
                    {/* Overlay with Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                        )}
                        {item.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-500/20 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-blue-900 truncate">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        {item.category && (
                          <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        )}
                        <span className="text-xs text-blue-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-blue-200 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  No gallery items found
                </h3>
                <p className="text-blue-500">
                  {selectedCategory !== 'all' 
                    ? `No items in "${selectedCategory}" category`
                    : 'Our gallery is currently empty. Please check back later for more photos.'}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-blue-100 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{galleryItems.length}</div>
                  <div className="text-blue-700 font-medium">Total Photos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {new Set(galleryItems.map(item => item.category)).size}
                  </div>
                  <div className="text-blue-700 font-medium">Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{filteredItems.length}</div>
                  <div className="text-blue-700 font-medium">
                    Showing {selectedCategory === 'all' ? 'all photos' : `"${selectedCategory}"`}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
