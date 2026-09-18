import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import avatarPlaceholder from '../assets/shukrullo/profile.png';

export function BlogPostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  // State for comments
  const [comments, setComments] = useState([]);
  
  // State for form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    saveInfo: false,
    text: ''
  });

  // Load comments
  useEffect(() => {
    if (post) {
      const storedComments = localStorage.getItem(`blog_comments_${post.id}`);
      if (storedComments) {
        setComments([...post.initialComments, ...JSON.parse(storedComments)]);
      } else {
        setComments([...post.initialComments]);
      }
      
      // Load saved user info
      const savedUser = localStorage.getItem('blog_user_info');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setFormData(prev => ({
          ...prev,
          name: parsed.name || '',
          email: parsed.email || '',
          website: parsed.website || '',
          saveInfo: true
        }));
      }
      
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return <div className="py-20 text-center text-xl">Post not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.text.trim()) {
      alert("Name, Email, and Comment are required.");
      return;
    }

    const newComment = {
      id: Date.now(), // Generate unique ID
      name: formData.name,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      text: formData.text,
      avatar: avatarPlaceholder,
      replies: []
    };

    // Save to local storage for this specific post
    const existingStored = JSON.parse(localStorage.getItem(`blog_comments_${post.id}`) || '[]');
    const updatedStored = [...existingStored, newComment];
    localStorage.setItem(`blog_comments_${post.id}`, JSON.stringify(updatedStored));

    // Update state
    setComments([...post.initialComments, ...updatedStored]);

    // Save user info if checkbox is checked
    if (formData.saveInfo) {
      localStorage.setItem('blog_user_info', JSON.stringify({
        name: formData.name,
        email: formData.email,
        website: formData.website
      }));
    } else {
      localStorage.removeItem('blog_user_info');
    }

    // Reset comment text only
    setFormData(prev => ({ ...prev, text: '' }));
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 md:py-20">
      
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-[32px] font-medium text-black mb-4">{post.title}</h1>
        <p className="text-[14px] text-gray-500 font-light">
          by <span className="font-medium text-black">{post.author}</span> - {post.date}
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <img src={post.image} alt={post.title} className="w-full h-auto object-cover rounded-md" />
      </div>

      {/* Content */}
      <div className="space-y-8 mb-16 text-[15px] leading-relaxed text-gray-700 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {post.content.map((block, index) => {
          if (block.type === 'paragraph') {
            return <p key={index}>{block.text}</p>;
          }
          if (block.type === 'subtitle') {
            return <h2 key={index} className="text-[22px] font-medium text-black mt-12 mb-6">{block.text}</h2>;
          }
          if (block.type === 'image') {
            return (
              <div key={index} className="my-10">
                <img src={block.src} alt="Blog inline content" className="w-full h-auto object-cover rounded-md" />
              </div>
            );
          }
          if (block.type === 'list') {
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 text-black">
                {block.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>

      {/* Footer Tags & Share */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-t border-b border-gray-200 mb-16 gap-6">
        <div className="flex items-center gap-4 text-[14px]">
          <span className="text-black font-medium">Tags</span>
          <div className="flex gap-2 text-gray-500">
            {post.tags.map((tag, idx) => (
              <span key={idx}>
                {tag}{idx < post.tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[14px]">
          <span className="text-black font-medium">Share</span>
          <div className="flex gap-4 text-gray-500">
            <button className="hover:text-black transition-colors" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </button>
            <button className="hover:text-black transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </button>
            <button className="hover:text-black transition-colors" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Leave a Reply Form */}
      <div className="mb-20">
        <h3 className="text-[22px] font-medium text-black mb-2">Leave a Reply</h3>
        <p className="text-[13px] text-gray-500 mb-8">Your email address will not be published. Required fields are marked *</p>
        
        <form onSubmit={handleSubmitComment} className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name*" 
              className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" 
              required
            />
          </div>
          <div className="relative">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email*" 
              className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" 
              required
            />
          </div>
          <div className="relative">
            <input 
              type="text" 
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Enter your Website" 
              className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" 
            />
          </div>

          <label className="flex items-start gap-3 mt-4 mb-8 cursor-pointer">
            <input 
              type="checkbox" 
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <span className="text-[13px] text-gray-500">
              Save my name, email, and website in this browser for the next time I comment.
            </span>
          </label>

          <div className="relative mb-8">
            <input 
              type="text" 
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Your Comment*" 
              className="w-full border-b border-gray-300 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" 
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-black text-white px-10 py-3 text-[13px] font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors rounded-sm"
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-[22px] font-medium text-black mb-10">Comments({comments.length})</h3>
        
        <div className="space-y-10">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                <img src={comment.avatar} alt={comment.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-black">{comment.name}</span>
                    <span className="text-gray-400 text-[12px]">{comment.date}</span>
                  </div>
                  <button className="text-gray-400 hover:text-black flex items-center gap-1 text-[12px] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                    Reply
                  </button>
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                  {comment.text}
                </p>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="space-y-8 mt-6">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-4 border-l-2 border-gray-100 pl-6">
                        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <img src={reply.avatar} alt={reply.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-black">{reply.name}</span>
                              <span className="text-gray-400 text-[12px]">{reply.date}</span>
                            </div>
                            <button className="text-gray-400 hover:text-black flex items-center gap-1 text-[12px] transition-colors">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                              Reply
                            </button>
                          </div>
                          <p className="text-gray-600 text-[14px] leading-relaxed">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
