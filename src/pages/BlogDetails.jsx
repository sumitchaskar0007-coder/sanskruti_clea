import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../api';
import { resolveImageUrl } from '../utils/imageUtils';
import './BlogDetails.css';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBySlug(slug);
      // Handle different response structures
      let blogData = response.data;
      if (response.data && response.data.blog) {
        blogData = response.data.blog;
      }
      console.log('Blog details:', blogData);
      setBlog(blogData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Blog not found');
      setLoading(false);
    }
  };

  // Function to render HTML content safely
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Function to get cover image URL
  const getCoverImage = () => {
    if (!blog) return null;
    return resolveImageUrl(blog.coverImage) || resolveImageUrl(blog.featuredImage);
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this article: ${blog.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  if (loading) return <div className="blog-details-loading">Loading...</div>;
  if (error) return <div className="blog-details-error">{error}</div>;
  if (!blog) return null;

  const coverImage = getCoverImage();

  return (
    <>
      <div
        className="reading-progress-bar"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="blog-details">
        <div className="blog-details-container">
          <header className="blog-details-header">
            <h1 className="blog-title">{blog.title}</h1>

            <div className="blog-meta-header">
              <div className="author-date">
                <span className="author">{blog.author || 'Admin'}</span>
                <span className="date">
                  {new Date(blog.createdAt || blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="reading-time">{blog.readTime || '5 min read'}</span>
              </div>
            </div>
          </header>

          {coverImage && (
            <figure className="blog-featured-image">
              <img 
                src={coverImage} 
                alt={blog.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
                }}
              />
            </figure>
          )}

          <div className="blog-content">
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={createMarkup(blog.content || '')} />
          </div>

          {/* Share Buttons */}
          <div className="share-buttons">
            <span>Share this article:</span>
            <button onClick={shareOnWhatsApp} className="share-btn whatsapp">
              WhatsApp
            </button>
            <button onClick={shareOnLinkedIn} className="share-btn linkedin">
              LinkedIn
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetails;