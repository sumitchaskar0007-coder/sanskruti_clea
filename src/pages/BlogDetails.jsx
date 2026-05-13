import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogsAPI } from "../api";
import { CalendarIcon, ClockIcon, EyeIcon, HeartIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await blogsAPI.getBySlug(slug);
      setBlog(res.data.blog);
      setRelatedBlogs(res.data.relatedBlogs || []);
      setLikesCount(res.data.blog.likes || 0);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      await blogsAPI.like(blog._id);
      setLikesCount(prev => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 pt-32">
        <h2 className="text-3xl font-semibold">Blog Not Found</h2>
        <Link to="/blogs" className="text-blue-600 mt-4 inline-block">← Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-gray-700 to-gray-500">
        <img
          src={blog.coverImage?.url || "https://placehold.co/1200x600?text=Blog+Image"}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center px-5">
          <div className="max-w-4xl">
            <div className="flex justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                {blog.category}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-2">
                <EyeIcon className="h-5 w-5" />
                {blog.views?.toLocaleString()} views
              </span>
              <span>By {blog.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-8 pb-8 border-b">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              {liked ? <HeartSolidIcon className="h-6 w-6" /> : <HeartIcon className="h-6 w-6" />}
              <span>{likesCount} Likes</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-600 transition"
            >
              <ShareIcon className="h-6 w-6" />
              <span>Share</span>
            </button>
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap items-center gap-3">
                <TagIcon className="h-5 w-5 text-gray-500" />
                {blog.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/blogs?search=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.coverImage?.url || "https://placehold.co/400x300?text=No+Image"}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{related.readTime}</span>
                      <span>•</span>
                      <span>{Math.ceil(related.content?.length / 1000) || 1} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}