import React, { useEffect, useState } from "react";
import { blogsAPI } from "../api";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      };
      
      const res = await blogsAPI.getAll(params);
      setBlogs(res.data.blogs || []);
      setTotalPages(res.data.totalPages || 1);
      
      // Extract unique categories
      const uniqueCategories = [...new Set((res.data.blogs || []).map(blog => blog.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setSearchParams({ page, ...(searchQuery && { search: searchQuery }), ...(selectedCategory !== 'all' && { category: selectedCategory }) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchParams({ ...(query && { search: query }), ...(selectedCategory !== 'all' && { category: selectedCategory }) });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Discover insights, updates, and educational articles from Sanskruti Techno School
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-4">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search articles..."
              className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Search
            </button>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={() => setSearchParams({ ...(searchQuery && { search: searchQuery }) })}
              className={`px-4 py-2 rounded-full transition ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat, ...(searchQuery && { search: searchQuery }) })}
                className={`px-4 py-2 rounded-full transition ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={blog.coverImage?.url || "https://placehold.co/600x400?text=No+Image"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    {blog.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {blog.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <EyeIcon className="h-4 w-4" />
                        {blog.views || 0}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TagIcon className="h-4 w-4" />
                        <div className="flex gap-2">
                          {blog.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-xs">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {blogs.length === 0 && (
              <div className="text-center py-20">
                <h2 className="text-3xl font-semibold text-gray-700">No Blogs Found</h2>
                <p className="text-gray-500 mt-4">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}