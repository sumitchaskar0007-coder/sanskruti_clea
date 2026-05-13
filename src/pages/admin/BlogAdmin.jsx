import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { blogsAPI } from "../../api";
import { XMarkIcon, PhotoIcon, Bars3Icon, XMarkIcon as CloseIcon } from '@heroicons/react/24/outline';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const categories = ['Education', 'News', 'Events', 'Announcements', 'General'];

const initialState = {
  title: "",
  excerpt: "",
  content: "",
  author: "Admin",
  tags: [],
  category: "General",
  metaTitle: "",
  metaDescription: "",
  featured: false,
  published: true,
};

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const params = {};
      if (filterCategory !== "all") params.category = filterCategory;
      
      const res = await blogsAPI.getAll(params);
      setBlogs(res.data.blogs || res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await blogsAPI.getStats();
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [filterCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      Object.keys(form).forEach((key) => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(form[key]));
        } else if (key !== 'coverImage') {
          formData.append(key, form[key]);
        }
      });

      if (image) {
        formData.append("coverImage", image);
      }

      if (editingId) {
        await blogsAPI.update(editingId, formData);
      } else {
        await blogsAPI.create(formData);
      }

      setForm(initialState);
      setImage(null);
      setImagePreview(null);
      setEditingId(null);
      setTagInput("");
      fetchBlogs();
      fetchStats();
      
      // Scroll to top after submission
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      author: blog.author,
      tags: blog.tags || [],
      category: blog.category || "General",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      featured: blog.featured || false,
      published: blog.published,
    });
    if (blog.coverImage?.url) {
      setImagePreview(blog.coverImage.url);
    }
    // Scroll to form on mobile
    if (window.innerWidth < 768) {
      document.getElementById('blog-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog? This action cannot be undone.")) return;
    
    try {
      await blogsAPI.delete(id);
      fetchBlogs();
      fetchStats();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({
        ...form,
        tags: [...form.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setForm({
      ...form,
      tags: form.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearForm = () => {
    setForm(initialState);
    setImage(null);
    setImagePreview(null);
    setEditingId(null);
    setTagInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-gray-900">Blog Admin</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Stats Summary */}
        {stats && mobileMenuOpen && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3">
                <p className="text-xs opacity-90">Total Blogs</p>
                <p className="text-xl font-bold">{stats.totalBlogs}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3">
                <p className="text-xs opacity-90">Published</p>
                <p className="text-xl font-bold">{stats.publishedBlogs}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-3">
                <p className="text-xs opacity-90">Total Views</p>
                <p className="text-xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-3">
                <p className="text-xs opacity-90">Categories</p>
                <p className="text-xl font-bold">{stats.categories.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Desktop Title - Hidden on Mobile */}
        <h1 className="hidden md:block text-3xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8">
          Blog Admin Dashboard
        </h1>

        {/* Statistics Cards - Desktop */}
        {stats && (
          <>
            {/* Desktop Stats */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold">{stats.totalBlogs}</h3>
                <p className="text-xs lg:text-sm opacity-90">Total Blogs</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold">{stats.publishedBlogs}</h3>
                <p className="text-xs lg:text-sm opacity-90">Published</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
                <p className="text-xs lg:text-sm opacity-90">Total Views</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold">{stats.categories.length}</h3>
                <p className="text-xs lg:text-sm opacity-90">Categories</p>
              </div>
            </div>
          </>
        )}

        {/* Blog Form */}
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {editingId ? "Edit Blog" : "Create New Blog"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                rows="3"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Brief description of the blog (max 200 characters)"
                maxLength="200"
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.excerpt.length}/200 characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 pb-5 sm:pt-5 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img src={imagePreview} alt="Preview" className="max-h-32 sm:max-h-48 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                      <div className="flex text-xs sm:text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags (e.g., Education, Technology)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-200 rounded-full text-xs sm:text-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                      <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
                modules={modules}
                className="bg-white h-64 sm:h-80 md:h-96 mb-12 sm:mb-16"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base"
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  placeholder="SEO Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base"
                  rows="3"
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  placeholder="SEO Description"
                  maxLength="160"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {form.metaDescription.length}/160 characters
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm sm:text-base">Featured Blog</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm sm:text-base">Published</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 text-sm sm:text-base font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                editingId ? "Update Blog" : "Create Blog"
              )}
            </button>
          </div>
        </form>

        {/* Blog List with Search */}
        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Blogs</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search blogs..."
                className="border border-gray-300 rounded-lg p-2.5 sm:p-2 text-sm sm:text-base w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-lg p-2.5 sm:p-2 text-sm sm:text-base w-full sm:w-auto"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No blogs found</p>
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div key={blog._id} className="bg-white border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  {/* Mobile View */}
                  <div className="block md:hidden">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {blog.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{blog.category}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-500">#{tag}</span>
                      ))}
                      {blog.tags?.length > 3 && (
                        <span className="text-xs text-gray-500">+{blog.tags.length - 3}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                      <span>Views: {blog.views || 0}</span>
                      <span>Likes: {blog.likes || 0}</span>
                      <span>{blog.readTime}</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editBlog(blog)}
                        className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        {blog.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                        )}
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{blog.category}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags?.map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-500">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Views: {blog.views || 0}</span>
                        <span>Likes: {blog.likes || 0}</span>
                        <span>{blog.readTime}</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => editBlog(blog)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Blog Count */}
          {filteredBlogs.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}