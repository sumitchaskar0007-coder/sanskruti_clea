import React, { useState, useEffect, useRef } from 'react';
import { blogAPI } from '../../api';
import { resolveImageUrl } from '../../utils/imageUtils';
import './BlogAdmin.css';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
    category: 'General',
    published: true,
    featured: false
  });
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [selectedFont, setSelectedFont] = useState('sans-serif');
  const [selectedFontSize, setSelectedFontSize] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentEditableRef = useRef(null);
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  const categories = ['Education', 'News', 'Events', 'Announcements', 'General'];
  const fonts = ['Sans Serif', 'Serif', 'Monospace', 'Arial', 'Georgia', 'Times New Roman'];
  const fontSizes = ['Small', 'Normal', 'Large', 'Huge'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllAdmin();
      console.log('Fetched blogs:', response.data);
      let blogsData = response.data;

      if (response.data?.blogs) {
        blogsData = response.data.blogs;
      } else if (response.data?.data) {
        blogsData = response.data.data;
      } else if (!Array.isArray(response.data) && typeof response.data === 'object') {
        const possibleArrays = Object.values(response.data).filter((value) => Array.isArray(value));
        if (possibleArrays.length > 0) {
          blogsData = possibleArrays[0];
        }
      }

      setBlogs(Array.isArray(blogsData) ? blogsData : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setLoading(false);
    }
  };

  // Initialize content editable div when editing
  useEffect(() => {
    if (contentEditableRef.current && (showForm || editingBlog)) {
      if (formData.content) {
        contentEditableRef.current.innerHTML = formData.content;
        setIsContentEmpty(!formData.content.trim());
      } else {
        contentEditableRef.current.innerHTML = '<p><br></p>';
        setIsContentEmpty(true);
      }
    }
  }, [showForm, formData.content, editingBlog]);

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
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rich Text Editor Commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    contentEditableRef.current.focus();
    updateContent();
  };

  const formatText = (command) => {
    switch(command) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'strikeThrough':
        execCommand('strikeThrough');
        break;
      case 'superscript':
        execCommand('superscript');
        break;
      case 'subscript':
        execCommand('subscript');
        break;
      default:
        break;
    }
  };

  const insertHeading = (level) => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const heading = document.createElement(`h${level}`);
      heading.textContent = selectedText || `Heading ${level}`;
      range.deleteContents();
      range.insertNode(heading);
      range.setStartAfter(heading);
      range.setEndAfter(heading);
      selection.removeAllRanges();
      selection.addRange(range);
      updateContent();
    }
  };

  const insertList = (type) => {
    if (type === 'unordered') {
      execCommand('insertUnorderedList');
    } else {
      execCommand('insertOrderedList');
    }
  };

  const insertBlockquote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = selectedText || '// Your code here';
      pre.appendChild(code);
      range.deleteContents();
      range.insertNode(pre);
      updateContent();
    }
  };

  const insertHorizontalRule = () => {
    execCommand('insertHorizontalRule');
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:', 'https://');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertUnlink = () => {
    execCommand('unlink');
  };

  const setTextColor = () => {
    const color = prompt('Enter color (hex, rgb, or color name):', '#000000');
    if (color) {
      execCommand('foreColor', color);
    }
  };

  const setBackgroundColor = () => {
    const color = prompt('Enter background color (hex, rgb, or color name):', '#ffff00');
    if (color) {
      execCommand('backColor', color);
    }
  };

  const changeFont = (font) => {
    setSelectedFont(font);
    execCommand('fontName', font);
  };

  const changeFontSize = (size) => {
    setSelectedFontSize(size);
    let fontSize;
    switch(size) {
      case 'Small': fontSize = '3'; break;
      case 'Normal': fontSize = '5'; break;
      case 'Large': fontSize = '6'; break;
      case 'Huge': fontSize = '7'; break;
      default: fontSize = '5';
    }
    execCommand('fontSize', fontSize);
  };

  const alignText = (alignment) => {
    execCommand(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
  };

  const indentText = () => {
    execCommand('indent');
  };

  const outdentText = () => {
    execCommand('outdent');
  };

  const insertSpecialChar = () => {
    const chars = ['©', '®', '™', '€', '£', '¥', '§', '¶', '•', '†', '‡', '…', '‰', '←', '→', '↑', '↓', '✓', '★', '♥', '♦', '♣', '♠'];
    const char = prompt(`Select a special character:\n${chars.join(', ')}`);
    if (char && chars.includes(char)) {
      execCommand('insertText', char);
    }
  };

  const updateContent = () => {
    if (contentEditableRef.current) {
      const html = contentEditableRef.current.innerHTML;
      setFormData(prev => ({ ...prev, content: html }));
      setIsContentEmpty(!html.trim() || html === '<p><br></p>');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Get the final content from the editor
      const finalContent = contentEditableRef.current?.innerHTML || formData.content;
      
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('content', finalContent);
      formDataToSend.append('excerpt', formData.excerpt || finalContent.replace(/<[^>]+>/g, '').substring(0, 160));
      formDataToSend.append('category', formData.category);
      formDataToSend.append('published', formData.published);
      formDataToSend.append('featured', formData.featured);
      
      // Add meta data if exists
      if (formData.metaTitle) formDataToSend.append('metaTitle', formData.metaTitle);
      if (formData.metaDescription) formDataToSend.append('metaDescription', formData.metaDescription);
      
      // Handle tags - convert array to JSON string
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      formDataToSend.append('tags', JSON.stringify(tagsArray));
      
      // Add cover image if exists
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }
      
      // Log the form data for debugging
      console.log('Submitting blog with data:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }
      
      let response;
      if (editingBlog) {
        response = await blogAPI.update(editingBlog._id, formDataToSend);
        console.log('Update response:', response);
        setShowSuccessMessage('Blog updated successfully!');
      } else {
        response = await blogAPI.create(formDataToSend);
        console.log('Create response:', response);
        setShowSuccessMessage('Blog created successfully!');
      }
      
      resetForm();
      await fetchBlogs(); // Refresh the blog list
      
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving blog:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      let errorMessage = 'Failed to save blog';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        errorMessage = Object.values(err.response.data.errors).join(', ');
      }
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    console.log('Editing blog:', blog);
    console.log('Cover image URL:', blog.coverImage);
    
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      excerpt: blog.excerpt || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      category: blog.category || 'General',
      published: blog.published,
      featured: blog.featured || false
    });
    
    // Handle cover image - resolve a normalized image URL for preview
    const coverImageUrl = resolveImageUrl(blog.coverImage);
    if (coverImageUrl) {
      setPreviewImage(coverImageUrl);
    } else {
      setPreviewImage('');
    }
    
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await blogAPI.delete(id);
      await fetchBlogs();
      setShowDeleteConfirm(null);
      setShowSuccessMessage('Blog deleted successfully!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
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
      category: 'General',
      published: true,
      featured: false
    });
    setCoverImage(null);
    setPreviewImage('');
    setSelectedFont('sans-serif');
    setSelectedFontSize('normal');
    setIsSubmitting(false);
  };

  // Function to render HTML content safely
  const renderHTMLContent = (content) => {
    if (!content) return 'No content';
    // Strip HTML tags for preview
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && blog.published) ||
                         (statusFilter === 'draft' && !blog.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) return <div className="blog-admin-loading">Loading...</div>;

  return (
    <div className="blog-admin">
      {showSuccessMessage && (
        <div className="success-toast">
          {showSuccessMessage}
        </div>
      )}

      {/* Application Topbar */}
      <div className="app-topbar">
        <div className="topbar-left">
          <div className="app-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="app-title">Blog Management System</span>
          <span className="app-version">v2.0</span>
        </div>
        <div className="topbar-center">
          <div className="breadcrumb">
            <span className="breadcrumb-item active">Blog Dashboard</span>
          </div>
        </div>
        <div className="topbar-right">
          <div className="topbar-stats">
            <div className="stat-badge">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{blogs.length}</span>
            </div>
            <div className="stat-badge">
              <span className="stat-label">Published:</span>
              <span className="stat-value">{blogs.filter(b => b.published).length}</span>
            </div>
          </div>
          <button className="topbar-btn" onClick={() => window.location.reload()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 4 4 12 4C16.7 4 20.3 6.8 22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M23 12C23 12 20 20 12 20C7.3 20 3.7 17.2 2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 10L23 12L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 14L1 12L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="blog-admin-main">
        {/* Header with Action Buttons */}
        <div className="blog-admin-header">
          <div className="header-title-section">
            <h1>Blog Posts</h1>
            <p>Manage your blog content, create new posts, and track performance</p>
          </div>
          {!showForm && (
            <button className="btn-create" onClick={() => setShowForm(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              New Blog Post
            </button>
          )}
        </div>

        {/* Filter Bar */}
        {!showForm && (
          <div className="filter-bar">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        )}

        {/* Blog Form with Rich Text Editor */}
        {showForm && (
          <div className="blog-form-container">
            <div className="form-header">
              <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <button className="btn-close-form" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="blog-form">
              {/* Title Section */}
              <div className="form-section">
                <label className="form-label required">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input title-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title..."
                  required
                />
              </div>

              {/* Rich Text Editor Section */}
              <div className="form-section">
                <label className="form-label required">Content * (Rich Text Editor)</label>
                
                {/* Main Toolbar - Row 1 */}
                <div className="editor-toolbar toolbar-row-1">
                  {/* Font and Size Dropdowns */}
                  <select 
                    className="toolbar-select"
                    value={selectedFont}
                    onChange={(e) => changeFont(e.target.value)}
                    title="Font Family"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="toolbar-select"
                    value={selectedFontSize}
                    onChange={(e) => changeFontSize(e.target.value)}
                    title="Font Size"
                  >
                    {fontSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>

                  <div className="toolbar-divider"></div>

                  {/* Text Formatting */}
                  <button type="button" onClick={() => formatText('bold')} title="Bold">
                    <strong>B</strong>
                  </button>
                  <button type="button" onClick={() => formatText('italic')} title="Italic">
                    <em>I</em>
                  </button>
                  <button type="button" onClick={() => formatText('underline')} title="Underline">
                    <u>U</u>
                  </button>
                  <button type="button" onClick={() => formatText('strikeThrough')} title="Strikethrough">
                    <s>S</s>
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Text Color */}
                  <button type="button" onClick={setTextColor} title="Text Color">
                    A <span style={{ fontSize: '10px' }}>▼</span>
                  </button>
                  <button type="button" onClick={setBackgroundColor} title="Background Color">
                    <span style={{ backgroundColor: '#ffff00', padding: '0 4px' }}>A</span>
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Superscript/Subscript */}
                  <button type="button" onClick={() => formatText('superscript')} title="Superscript">
                    x²
                  </button>
                  <button type="button" onClick={() => formatText('subscript')} title="Subscript">
                    x₂
                  </button>
                </div>

                {/* Toolbar - Row 2 */}
                <div className="editor-toolbar toolbar-row-2">
                  {/* Headings */}
                  <button type="button" onClick={() => insertHeading(1)} title="Heading 1">
                    H1
                  </button>
                  <button type="button" onClick={() => insertHeading(2)} title="Heading 2">
                    H2
                  </button>
                  <button type="button" onClick={() => insertHeading(3)} title="Heading 3">
                    H3
                  </button>
                  <button type="button" onClick={() => insertHeading(4)} title="Heading 4">
                    H4
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Lists */}
                  <button type="button" onClick={() => insertList('unordered')} title="Bullet List">
                    ≡
                  </button>
                  <button type="button" onClick={() => insertList('ordered')} title="Numbered List">
                    ≅
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Alignment */}
                  <button type="button" onClick={() => alignText('left')} title="Align Left">
                    ≡
                  </button>
                  <button type="button" onClick={() => alignText('center')} title="Align Center">
                    ≅
                  </button>
                  <button type="button" onClick={() => alignText('right')} title="Align Right">
                    ≡
                  </button>
                  <button type="button" onClick={() => alignText('full')} title="Justify">
                    ≅
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Indent/Outdent */}
                  <button type="button" onClick={outdentText} title="Decrease Indent">
                    ←
                  </button>
                  <button type="button" onClick={indentText} title="Increase Indent">
                    →
                  </button>
                </div>

                {/* Toolbar - Row 3 */}
                <div className="editor-toolbar toolbar-row-3">
                  {/* Insert Elements */}
                  <button type="button" onClick={insertBlockquote} title="Quote">
                    “ ”
                  </button>
                  <button type="button" onClick={insertCodeBlock} title="Code Block">
                    &lt;/&gt;
                  </button>
                  <button type="button" onClick={insertHorizontalRule} title="Horizontal Rule">
                    —
                  </button>
                  <button type="button" onClick={insertImage} title="Insert Image">
                    🖼️
                  </button>
                  <button type="button" onClick={insertLink} title="Insert Link">
                    🔗
                  </button>
                  <button type="button" onClick={insertUnlink} title="Remove Link">
                    🔗✖
                  </button>
                  <button type="button" onClick={insertSpecialChar} title="Special Characters">
                    Ω
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Undo/Redo */}
                  <button type="button" onClick={() => execCommand('undo')} title="Undo">
                    ↶
                  </button>
                  <button type="button" onClick={() => execCommand('redo')} title="Redo">
                    ↷
                  </button>

                  <div className="toolbar-divider"></div>

                  {/* Clear Formatting */}
                  <button type="button" onClick={() => execCommand('removeFormat')} title="Clear Formatting">
                    ✖
                  </button>

                  {/* HTML View Toggle */}
                  <button type="button" onClick={() => {
                    const html = contentEditableRef.current.innerHTML;
                    const text = prompt('Edit HTML:', html);
                    if (text) {
                      contentEditableRef.current.innerHTML = text;
                      updateContent();
                    }
                  }} title="Edit HTML">
                    &lt;&gt;
                  </button>
                </div>

                {/* Editable Content Area */}
                <div 
                  ref={contentEditableRef}
                  className={`content-editable ${isContentEmpty ? 'empty' : ''}`}
                  contentEditable="true"
                  onInput={updateContent}
                  onBlur={updateContent}
                  data-placeholder="Write your blog content here... Use the toolbar to add headings, images, quotes, lists, and more!"
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p><br></p>' }}
                />
                
                <div className="editor-help-text">
                  <small>Tip: Use the toolbar above to format your content. You can add images, links, lists, and more!</small>
                </div>
              </div>

              {/* Two Column Layout for Blog Settings */}
              <div className="form-two-columns">
                {/* Left Column */}
                <div className="form-column">
                  <div className="form-section">
                    <label className="form-label">Featured Image</label>
                    <div className="image-upload-area">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="image-upload" className="image-upload-label">
                        {previewImage ? (
                          <div className="image-preview-wrapper">
                            <img src={previewImage} alt="Preview" className="image-preview" />
                            <span className="change-image-btn">Change Image</span>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>Click to upload cover image</span>
                            <small>PNG, JPG, WEBP up to 5MB</small>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      name="author"
                      className="form-input"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-section">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-section">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      className="form-input"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="education, school, learning (comma separated)"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-column">
                  <div className="form-section">
                    <label className="form-label">Excerpt (Brief summary)</label>
                    <textarea
                      name="excerpt"
                      className="form-textarea"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows="3"
                      maxLength="200"
                      placeholder="A short summary of your blog post..."
                    />
                    <small>{formData.excerpt.length}/200 characters</small>
                  </div>

                  <div className="form-section">
                    <label className="form-label">Meta Title (SEO)</label>
                    <input
                      type="text"
                      name="metaTitle"
                      className="form-input"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      placeholder="SEO optimized title"
                    />
                  </div>

                  <div className="form-section">
                    <label className="form-label">Meta Description (SEO)</label>
                    <textarea
                      name="metaDescription"
                      className="form-textarea"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows="2"
                      maxLength="160"
                      placeholder="SEO optimized description"
                    />
                    <small>{formData.metaDescription.length}/160 characters</small>
                  </div>

                  <div className="form-section">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="published"
                          checked={formData.published}
                          onChange={handleInputChange}
                        />
                        <span>Publish immediately</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                        />
                        <span>Feature this post (show at top)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (editingBlog ? 'Update Blog Post' : 'Publish Blog Post')}
                </button>
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blogs List Table */}
        {!showForm && (
          <div className="blogs-list-container">
            <div className="blogs-table-wrapper">
              <table className="blogs-table">
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map((blog) => {
                    const coverImageUrl = resolveImageUrl(blog.coverImage);
                    return (
                      <tr key={blog._id || blog.id}>
                        <td className="cover-cell">
                          {coverImageUrl ? (
                            <img 
                              src={coverImageUrl} 
                              alt={blog.title} 
                              className="table-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="no-cover">No image</div>
                          )}
                        </td>
                        <td className="title-cell">
                          <div className="title-wrapper">
                            <span className="blog-title-text">{blog.title}</span>
                            {blog.featured && <span className="featured-badge">Featured</span>}
                          </div>
                          <div className="blog-excerpt-preview">
                            {renderHTMLContent(blog.excerpt || blog.content)}
                          </div>
                        </td>
                        <td>{blog.author}</td>
                        <td><span className="category-badge">{blog.category}</span></td>
                        <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                        <td>{blog.views || 0}</td>
                        <td>
                          <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(blog)}
                              title="Edit"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => setShowDeleteConfirm(blog._id)}
                              title="Delete"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredBlogs.length === 0 && (
                <div className="no-results">
                  <p>No blogs found. Create your first blog post!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Blog Post</h3>
            <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-confirm-delete" onClick={() => handleDelete(showDeleteConfirm)}>
                Delete
              </button>
              <button className="btn-cancel-delete" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;