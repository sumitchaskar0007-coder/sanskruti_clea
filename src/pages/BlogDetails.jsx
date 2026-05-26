import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../api';
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
      setBlog(response.data);
      setLoading(false);
    } catch (err) {
      setError('Blog not found');
      setLoading(false);
    }
  };

  const formatContent = (content) => {
    // Simple parser for Medium-style content
    const lines = content.split('\n');
    let formattedContent = [];
    let inQuote = false;
    let quoteContent = [];

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        formattedContent.push(<h1 key={index}>{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        formattedContent.push(<h2 key={index}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        formattedContent.push(<h3 key={index}>{line.slice(4)}</h3>);
      } else if (line.startsWith('> ')) {
        if (!inQuote) {
          inQuote = true;
          quoteContent = [line.slice(2)];
        } else {
          quoteContent.push(line.slice(2));
        }
      } else if (line.startsWith('- ')) {
        formattedContent.push(
          <div key={index} className="blog-list-item">
            • {line.slice(2)}
          </div>
        );
      } else if (line.startsWith('```')) {
        // Skip code blocks for now
      } else if (line.trim() === '---') {
        formattedContent.push(<hr key={index} className="blog-divider" />);
      } else {
        if (inQuote && quoteContent.length > 0) {
          formattedContent.push(
            <blockquote key={`quote-${index}`}>
              {quoteContent.join(' ')}
            </blockquote>
          );
          inQuote = false;
          quoteContent = [];
        }
        if (line.trim()) {
          formattedContent.push(<p key={index}>{line}</p>);
        }
      }
    });

    if (inQuote && quoteContent.length > 0) {
      formattedContent.push(
        <blockquote key="quote-last">
          {quoteContent.join(' ')}
        </blockquote>
      );
    }

    return formattedContent;
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

  // Drop cap effect for first paragraph
  const firstParagraph = blog.content.split('\n')[0];
  const restContent = blog.content.split('\n').slice(1).join('\n');

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
                <span className="author">{blog.author}</span>
                <span className="date">
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="reading-time">{blog.readingTime} min read</span>
              </div>
            </div>
          </header>

          {blog.featuredImage && (
            <figure className="blog-featured-image">
              <img src={blog.featuredImage} alt={blog.title} />
              {blog.images?.[0]?.caption && (
                <figcaption>{blog.images[0].caption}</figcaption>
              )}
            </figure>
          )}

          <div className="blog-content">
            <div className="blog-first-paragraph">
              {firstParagraph && (
                <p className="drop-cap">{firstParagraph}</p>
              )}
            </div>
            {formatContent(restContent)}
          </div>

          {/* Highlight Box Example */}
          <div className="blog-highlight-box">
            <h3>📚 Key Takeaways</h3>
            <p>
              This comprehensive guide helps you understand the differences between
              educational boards and make an informed decision for your child's future.
            </p>
          </div>

          {/* CTA Section */}
          <div className="blog-cta">
            <h3>Ready to learn more about Sanskruti Techno School?</h3>
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={() => navigate('/contact')}>
                Book a School Visit
              </button>
              <button className="cta-button secondary" onClick={() => navigate('/contact')}>
                Enquire Now
              </button>
              <button className="cta-button tertiary" onClick={() => navigate('/contact')}>
                Contact Us
              </button>
            </div>
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