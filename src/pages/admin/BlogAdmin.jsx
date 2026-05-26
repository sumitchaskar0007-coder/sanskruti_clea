import React, { useState, useEffect } from 'react';
import { blogAPI } from '../../api';
import './BlogAdmin.css';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
    published: true
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllAdmin();
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    formDataToSend.append('data', JSON.stringify(blogData));
    if (featuredImage) {
      formDataToSend.append('featuredImage', featuredImage);
    }

    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, formDataToSend);
      } else {
        await blogAPI.create(formDataToSend);
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      excerpt: blog.excerpt,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      tags: blog.tags.join(', '),
      published: blog.published
    });
    setPreviewImage(blog.featuredImage);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.delete(id);
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog');
      }
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setShowForm(false);
    setFormData({
      title: '',
      author: '',
      content: '',
      excerpt: '',
      metaTitle: '',
      metaDescription: '',
      tags: '',
      published: true
    });
    setFeaturedImage(null);
    setPreviewImage('');
  };

  if (loading) return <div className="blog-admin-loading">Loading...</div>;

  return (
    <div className="blog-admin">
      <div className="blog-admin-header">
        <h1>Blog Management</h1>
        {!showForm && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Create New Blog
          </button>
        )}
      </div>

      {showForm && (
        <div className="blog-form-container">
          <h2>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Excerpt * (Brief summary for blog listing)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                required
                maxLength="200"
              />
              <small>{formData.excerpt.length}/200 characters</small>
            </div>

            <div className="form-group">
              <label>Content * (Use Markdown-style: # for H1, ## for H2, &gt; for quotes, - for lists)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="15"
                required
                placeholder="# Main Heading\n## Subheading\nYour content here...\n\n> Quote text here\n\n- List item 1\n- List item 2"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Meta Title * (SEO)</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="education, school, learning"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Meta Description * (SEO)</label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                rows="2"
                required
                maxLength="160"
              />
              <small>{formData.metaDescription.length}/160 characters</small>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                />
                Publish immediately
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blogs-list">
        <h2>All Blogs</h2>
        <div className="blogs-table-container">
          <table className="blogs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Views</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div className="blog-title-cell">
                      {blog.featuredImage && (
                        <img src={blog.featuredImage} alt={blog.title} className="blog-thumbnail" />
                      )}
                      <span>{blog.title}</span>
                    </div>
                  </td>
                  <td>{blog.author}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>{blog.views}</td>
                  <td>
                    <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
