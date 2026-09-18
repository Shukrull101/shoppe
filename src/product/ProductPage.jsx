import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

// SVG Иконки
const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={filled ? "text-black" : "text-gray-300"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeThumb, setActiveThumb] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Отзывы и форма
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Прокрутка наверх и загрузка отзывов при смене товара
  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem(`reviews_${id}`);
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(product?.reviews || []);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <Link to="/shop" className="text-[#A18A68] hover:text-black transition-colors">Return to Shop</Link>
      </div>
    );
  }

  // Заглушка: дублируем основную картинку 4 раза для миниатюр
  const thumbnails = [product.image, product.image, product.image, product.image];

  // Похожие товары (первые 3 товара, кроме текущего)
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      alert("Please select a rating by clicking on the stars.");
      return;
    }
    
    const form = e.target;
    const newReview = {
      id: Date.now(),
      author: form.author.value,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      rating: reviewRating,
      text: form.text.value
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    
    setReviewRating(0);
    form.reset();
  };

  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareText = encodeURIComponent(`Check out ${product.title} at Shoppe!`);

  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Хлебные крошки и основной блок */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20 animate-fade-in-up">
          
          {/* Левая колонка - Галерея */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 md:gap-8">
            {/* Миниатюры */}
            <div className="flex md:flex-col gap-4 md:w-20 overflow-x-auto md:overflow-visible">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveThumb(idx)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border transition-colors ${activeThumb === idx ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={thumb} alt={`${product.title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Главное изображение */}
            <div className="flex-1 relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
              {product.badge && (
                <div className={`absolute top-4 left-4 px-2 py-1 text-xs rounded ${product.badgeColor} z-10`}>
                  {product.badge}
                </div>
              )}
              {product.image ? (
                <img src={thumbnails[activeThumb]} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Image Placeholder</div>
              )}
            </div>
          </div>

          {/* Правая колонка - Информация о товаре */}
          <div className="w-full lg:w-1/2 pt-4">
            <h1 className="text-3xl font-medium mb-4">{product.title}</h1>
            <p className="text-xl text-[#A18A68] font-medium mb-6">{product.price}</p>
            
            {/* Рейтинг */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
              </div>
              <span className="text-gray-500 text-sm">1 customer review</span>
            </div>
            
            {/* Описание */}
            <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.
            </p>

            {/* Добавление в корзину */}
            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center border border-gray-200 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                >-</button>
                <span className="w-12 text-center text-[15px]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                >+</button>
              </div>
              <button className="flex-1 bg-white border border-black text-black h-12 text-sm uppercase tracking-wider font-medium hover:bg-black hover:text-white transition-colors rounded-sm">
                Add to cart
              </button>
            </div>

            {/* Иконки и метаданные */}
            <div className="flex items-center gap-6 mb-10">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors ${isLiked ? 'text-red-500' : 'text-black hover:text-gray-500'}`}
              >
                <HeartIcon filled={isLiked} />
              </button>
              <div className="w-px h-5 bg-gray-300"></div>
              <div className="flex gap-5 text-black">
                <a href={`mailto:?subject=${encodeURIComponent(product.title)}&body=${shareText}%0A${currentUrl}`} className="hover:text-gray-500 transition-colors" title="Share via Email"><MailIcon /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors" title="Share on Facebook"><FacebookIcon /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors" title="Instagram"><InstagramIcon /></a>
                <a href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`} target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors" title="Share on Twitter"><TwitterIcon /></a>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p><span className="text-black font-medium w-24 inline-block">SKU:</span> <span className="text-gray-500">12</span></p>
              <p><span className="text-black font-medium w-24 inline-block">Categories:</span> <span className="text-gray-500">Fashion, Style</span></p>
            </div>

          </div>
        </div>

        {/* Табы */}
        <div className="border-b border-gray-200 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex gap-8 md:gap-16">
            {['Description', 'Additional information', `Reviews(${reviews.length})`].map((tab) => {
              const tabKey = tab.toLowerCase().split('(')[0];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`pb-4 text-[16px] transition-colors relative ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  {tab}
                  {isActive && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Контент табов */}
        <div className="mb-24 text-gray-500 text-[15px] leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'description' && (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.
                </p>
              )}
              {activeTab === 'additional' && (
                <div className="space-y-2">
                  <p><strong>Weight:</strong> 0.3 kg</p>
                  <p><strong>Dimensions:</strong> 15 x 10 x 1 cm</p>
                  <p><strong>Material:</strong> Gold-plated brass</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                  {/* Reviews List */}
                  <div className="flex-1">
                    <h3 className="text-xl text-black font-medium mb-8">
                      {reviews.length} Reviews for {product.title.toLowerCase()}
                    </h3>
                    
                    {reviews.length > 0 ? (
                      <div className="space-y-8">
                        <AnimatePresence mode="popLayout">
                          {reviews.map((review, idx) => (
                            <motion.div 
                              layout
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.4, type: 'spring' }}
                              key={review.id}
                            >
                              <div className="flex items-center gap-4 mb-2">
                                <span className="text-black font-medium text-[16px]">{review.author}</span>
                                <span className="text-gray-400 text-sm">{review.date}</span>
                              </div>
                              <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= review.rating} />)}
                              </div>
                              <p className="text-gray-500 leading-relaxed">{review.text}</p>
                              {idx < reviews.length - 1 && <div className="h-px bg-gray-200 mt-8 w-full"></div>}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <p>There are no reviews yet. Be the first to review "{product.title}".</p>
                    )}
                  </div>
                  
                  {/* Add Review Form */}
                  <div className="flex-1">
                    <h3 className="text-xl text-black font-medium mb-2">Add a Review</h3>
                    <p className="text-[13px] text-gray-500 mb-8">Your Email Address Will Not Be Published. Required Fields Are Marked *</p>
                    
                    <form className="space-y-4 text-black" onSubmit={handleReviewSubmit}>
                      <textarea name="text" required placeholder="Your Review*" rows={1} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors resize-none placeholder-gray-400 bg-transparent text-[15px]"></textarea>
                      <input name="author" required type="text" placeholder="Enter your name*" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent text-[15px]" />
                      <input name="email" required type="email" placeholder="Enter your Email*" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent text-[15px]" />
                      
                      <label className="flex items-start gap-3 text-[13px] text-gray-500 mt-8 cursor-pointer">
                        <input type="checkbox" className="mt-[2px] w-4 h-4 accent-black border-gray-300 rounded-sm" />
                        Save my name, email, and website in this browser for the next time I comment
                      </label>
                      
                      <div className="mt-8">
                        <p className="text-gray-500 text-[13px] mb-3">Your Rating*</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <motion.button
                              type="button"
                              key={i}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setReviewRating(i)}
                              onMouseEnter={() => setHoverRating(i)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none"
                            >
                              <StarIcon filled={i <= (hoverRating || reviewRating)} />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <button type="submit" className="mt-12 bg-black text-white px-10 py-3 rounded-sm text-[15px] font-medium hover:bg-gray-800 transition-colors">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Секция похожих товаров */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-medium mb-10">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {similarProducts.map((p, index) => (
              <Link 
                to={`/shop/${p.id}`} 
                key={p.id} 
                className="group cursor-pointer block"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-sm">
                  {p.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 text-[11px] rounded ${p.badgeColor} z-20`}>
                      {p.badge}
                    </div>
                  )}
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm transition-transform duration-700 group-hover:scale-105">
                      Image Placeholder
                    </div>
                  )}

                  {/* Hover Overlay - Размытие и иконки */}
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                      {/* Упрощенная иконка корзины для карточки */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                      {/* Упрощенная иконка просмотра для карточки */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
                      <HeartIcon />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <h3 className="text-[16px] font-normal mb-1 group-hover:text-gray-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-[#A18A68] font-medium">
                  {p.price}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
