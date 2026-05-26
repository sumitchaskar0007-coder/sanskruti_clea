import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../api';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load blogs');
      setLoading(false);
    }
  };

  if (loading) return <div className="blog-loading">Loading...</div>;
  if (error) return <div className="blog-error">{error}</div>;

  return (
    <div className="blog-page">
      <div className="blog-container">
        <header className="blog-header">
          <h1>Blog</h1>
          <p>Insights, stories, and updates from Sanskruti Techno School</p>
        </header>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <article key={blog._id} className="blog-card">
              {blog.featuredImage && (
                <Link to={`/blog/${blog.slug}`} className="blog-card-image">
                  <img src={blog.featuredImage} alt={blog.title} />
                </Link>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{blog.readingTime} min read</span>
                </div>
                <Link to={`/blog/${blog.slug}`} className="blog-card-title">
                  <h2>{blog.title}</h2>
                </Link>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-author">
                  <span>By {blog.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;