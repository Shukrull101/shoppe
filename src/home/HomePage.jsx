import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import carouselImg1 from '../assets/shop/Img_01_carousel.png';
import carouselImg2 from '../assets/shop/Img_02_carousel.png';
import carouselImg3 from '../assets/shop/Img_03_carousel.png';

// Иконки для карточки (корзина, просмотр, лайк)
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Массив данных для карусели
const carouselItems = [
  { id: 1, title: 'Gold big hoops', price: '$ 68,00', image: carouselImg1 },
  { id: 2, title: 'Silver small hoops', price: '$ 45,00', image: carouselImg2 },
  { id: 3, title: 'Diamond necklace', price: '$ 120,00', image: carouselImg3 },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (e, id) => {
    e.preventDefault(); // Останавливаем переход по ссылке (Link)
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Автопрокрутка карусели
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Carousel Section */}
      <section className="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden mx-auto max-w-[1920px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex flex-col justify-center px-8 md:px-[10%] bg-gray-200"
          >
            {/* Изображение слайда */}
            <img
              src={carouselItems[currentSlide].image}
              alt={carouselItems[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 text-white max-w-sm">
              <h2 className="text-4xl md:text-5xl font-medium mb-4 drop-shadow-md">{carouselItems[currentSlide].title}</h2>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">{carouselItems[currentSlide].price}</p>
              <Link 
                to={`/shop/${carouselItems[currentSlide].id}`}
                className="inline-block border border-white px-8 py-3 rounded-sm text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-black/10"
              >
                View Product
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 ${currentSlide === idx ? 'bg-white' : 'bg-transparent hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Shop The Latest Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-[32px] font-medium animate-fade-in-up">Shop The Latest</h2>
          <Link to="/shop" className="text-[#A18A68] hover:text-black transition-colors text-sm font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {products.slice(0, 6).map((product, index) => (
            <Link
              to={`/shop/${product.id}`}
              key={product.id}
              className="group cursor-pointer block animate-fade-in-up"
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-sm">

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 text-[11px] rounded ${product.badgeColor} z-20`}>
                    {product.badge}
                  </div>
                )}

                {/* Изображение или заглушка */}
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm transition-transform duration-700 group-hover:scale-105">
                    Image Placeholder
                  </div>
                )}

                {/* Hover Overlay - Размытие и иконки */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                    <CartIcon />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                    <EyeIcon />
                  </button>
                  <button 
                    onClick={(e) => toggleLike(e, product.id)}
                    className={`w-10 h-10 bg-white rounded-full flex items-center justify-center transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150 ${likedItems[product.id] ? 'text-red-500' : 'text-black hover:bg-black hover:text-white'}`}
                  >
                    <HeartIcon filled={likedItems[product.id]} />
                  </button>
                </div>

              </div>

              {/* Product Info */}
              <h3 className="text-[16px] font-normal mb-1 group-hover:text-gray-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-[#A18A68] font-medium">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
