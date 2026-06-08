import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { resolveImageUrl } from '../utils/imageUtils';
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
      // The response might be nested, so we need to handle different response structures
      let blogsData = [];
      
      if (response.data && Array.isArray(response.data)) {
        blogsData = response.data;
      } else if (response.data && response.data.blogs && Array.isArray(response.data.blogs)) {
        blogsData = response.data.blogs;
      } else if (Array.isArray(response)) {
        blogsData = response;
      } else if (response.data && typeof response.data === 'object') {
        const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          blogsData = possibleArrays[0];
        }
      }
      
      console.log('Blogs data:', blogsData);
      setBlogs(blogsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
      setLoading(false);
    }
  };

  // Function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Function to get excerpt from content
  const getExcerpt = (blog) => {
    if (blog.excerpt) {
      return stripHtmlTags(blog.excerpt);
    }
    if (blog.content) {
      const text = stripHtmlTags(blog.content);
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
    return 'No description available';
  };

  if (loading) return <div className="blog-loading">Loading...</div>;
  if (error) return <div className="blog-error">{error}</div>;
  if (!blogs || blogs.length === 0) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <header className="blog-header">
            <h1>Blog</h1>
            <p>Insights, stories, and updates from Sanskruti Techno School</p>
          </header>
          <div className="no-blogs">
            <p>No blog posts found. Check back soon for updates!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        <header className="blog-header">
          <h1>Blog</h1>
          <p>Insights, stories, and updates from Sanskruti Techno School</p>
        </header>

        <div className="blog-grid">
          {blogs.map((blog) => {
            const coverImageUrl = resolveImageUrl(blog.coverImage) || resolveImageUrl(blog.featuredImage);
            
            return (
              <article key={blog._id || blog.id} className="blog-card">
                {coverImageUrl && (
                  <Link to={`/blog/${blog.slug}`} className="blog-card-image">
                    <img 
                      src={coverImageUrl} 
                      alt={blog.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/350x240?text=Blog+Image';
                      }}
                    />
                  </Link>
                )}
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span>{new Date(blog.createdAt || blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`} className="blog-card-title">
                    <h2>{blog.title}</h2>
                  </Link>
                  <p className="blog-card-excerpt">{getExcerpt(blog)}</p>
                  <div className="blog-card-author">
                    <span>By {blog.author || 'Admin'}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;