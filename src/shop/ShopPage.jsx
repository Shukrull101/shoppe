import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../cart';

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

// Заглушка для иконки поиска
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Заглушка для иконки шеврона
const ChevronDownIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Компонент переключателя (Toggle)
const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${checked ? 'bg-black' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-4' : ''}`} />
  </div>
);

// Компонент ползунка с двумя значениями (Dual Range Slider)
const DualRangeSlider = ({ min, max, value, onChange }) => {
  const [minVal, maxVal] = value;
  const getPercent = (val) => Math.round(((val - min) / (max - min)) * 100);

  return (
    <div className="relative h-[2px] bg-gray-200 mb-4 mt-8 dual-range flex items-center w-full">
      <style>{`
        .dual-range input[type=range] {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        .dual-range input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 14px;
          height: 14px;
          background-color: #000;
          border-radius: 50%;
          cursor: pointer;
        }
        .dual-range input[type=range]::-moz-range-thumb {
          pointer-events: all;
          width: 14px;
          height: 14px;
          background-color: #000;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
      `}</style>
      <input 
        type="range" min={min} max={max} step="1" 
        value={minVal} 
        onChange={(e) => onChange([Math.min(Number(e.target.value), maxVal - 1), maxVal])}
        className="absolute w-full h-0 appearance-none pointer-events-none z-20 bg-transparent outline-none left-0"
      />
      <input 
        type="range" min={min} max={max} step="1" 
        value={maxVal} 
        onChange={(e) => onChange([minVal, Math.max(Number(e.target.value), minVal + 1)])}
        className="absolute w-full h-0 appearance-none pointer-events-none z-20 bg-transparent outline-none left-0"
      />
      <div 
        className="absolute h-full bg-black z-10" 
        style={{ 
          left: `${getPercent(minVal)}%`, 
          right: `${100 - getPercent(maxVal)}%` 
        }}
      ></div>
    </div>
  );
};



export function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  
  const [likedItems, setLikedItems] = useState({});
  const { addToCart } = useCart();

  const toggleLike = (e, id) => {
    e.preventDefault();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Цены наших товаров от 19 до 30, поэтому ползунок будет от 0 до 50
  const [priceRange, setPriceRange] = useState([0, 50]);

  // Вспомогательная функция для парсинга цены из '$ 20,00' в число
  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9,-]+/g,"").replace(",", "."));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lowerQuery));
    }

    if (onSale) {
      result = result.filter(p => p.badge && p.badge.includes('%'));
    }

    if (inStock) {
      result = result.filter(p => p.badge !== 'Sold out');
    }

    // Фильтр по диапазону цен
    result = result.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [searchQuery, sortBy, onSale, inStock, priceRange]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-[32px] font-medium mb-10 animate-fade-in-up">Shop The Latest</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">

        {/* Sidebar */}
        <aside className="w-full lg:w-[260px] flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

          {/* Search */}
          <div className="relative mb-10">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b border-gray-300 py-2 pr-8 text-sm outline-none focus:border-black transition-colors duration-300"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </div>
          </div>

          {/* Selects */}
          <div className="space-y-4 mb-10">
            <div className="w-full border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center bg-white relative transition-colors duration-300 hover:border-gray-400 focus-within:border-black">
              <select className="w-full appearance-none outline-none text-sm text-gray-600 bg-transparent cursor-pointer z-10 transition-colors">
                <option value="">Shop By</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 transition-colors">
                <ChevronDownIcon />
              </div>
            </div>
            <div className="w-full border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center bg-white relative transition-colors duration-300 hover:border-gray-400 focus-within:border-black">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none outline-none text-sm text-gray-600 bg-transparent cursor-pointer z-10"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-10">
            <DualRangeSlider 
              min={0} 
              max={50} 
              value={priceRange} 
              onChange={setPriceRange} 
            />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Price: ${priceRange[0]} - ${priceRange[1]}</span>
              <span className="text-[#A18A68] cursor-pointer hover:underline">Filter</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm">On sale</span>
              <ToggleSwitch checked={onSale} onChange={() => setOnSale(!onSale)} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">In stock</span>
              <ToggleSwitch checked={inStock} onChange={() => setInStock(!inStock)} />
            </div>
          </div>

        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    key={product.id} 
                    className="group cursor-pointer"
                  >
                    <Link to={`/shop/${product.id}`} className="block h-full">
                      {/* Image Placeholder */}
                <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-md">
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 text-[11px] rounded ${product.badgeColor} z-10`}>
                      {product.badge}
                    </div>
                  )}
                  {/* Изображение или заглушка */}
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm transition-transform duration-500 group-hover:scale-105">
                      Image Placeholder
                    </div>
                  )}

                  {/* Hover Overlay - Размытие и иконки */}
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
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
              </motion.div>
              ))
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center text-gray-500 py-10"
              >
                No products found matching your criteria.
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
