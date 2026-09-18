import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ALIF10') {
      setDiscount(cartTotal * 0.1);
      alert('Coupon ALIF10 applied! 10% discount.');
    } else {
      alert('Invalid coupon code. Try ALIF10.');
      setDiscount(0);
    }
  };

  // Заглушка стоимости доставки
  const shippingCost = cartItems.length > 0 ? 22 : 0;
  const finalTotal = cartTotal + shippingCost - discount;

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-[32px] font-medium text-center mb-12 animate-fade-in-up">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Cart Items */}
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="hidden md:grid grid-cols-[3fr_1fr_1fr] gap-4 border-b border-gray-200 pb-4 mb-6">
            <span className="text-sm text-gray-500 font-medium tracking-wider">PRODUCT</span>
            <span className="text-sm text-gray-500 font-medium tracking-wider">QUANTITY</span>
            <span className="text-sm text-gray-500 font-medium tracking-wider text-right">TOTAL</span>
          </div>

          <AnimatePresence>
            {cartItems.map(item => {
              const itemTotal = parseFloat(item.price.replace(/[^0-9,.]/g, '').replace(',', '.')) * item.quantity;
              return (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] items-start md:items-center gap-4 py-6 border-b border-gray-200 relative group"
                >
                  {/* Remove button (mobile absolute, desktop absolute right) */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute right-0 top-6 md:right-auto md:-left-8 text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"
                    aria-label="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>

                  {/* Image & Title */}
                  <div className="flex gap-6 items-center">
                    <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                      )}
                    </div>
                    <div>
                      <Link to={`/shop/${item.id}`} className="text-base font-normal text-black hover:text-gray-600 transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1 mb-2">Black / Medium</p>
                      <p className="text-[#A18A68] font-medium">{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center bg-gray-50 rounded mt-4 md:mt-0 w-max">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                    >-</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                    >+</button>
                  </div>

                  {/* Total */}
                  <div className="hidden md:block text-right">
                    <span className="font-medium">$ {itemTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {cartItems.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              Your cart is currently empty.
            </div>
          )}

          {/* Cart Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-10">
            <div className="w-full sm:w-auto flex gap-4 border-b border-gray-300 pb-2 flex-1 max-w-sm">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className="outline-none bg-transparent flex-1 text-sm text-gray-700"
              />
              <button 
                onClick={handleApplyCoupon}
                className="text-sm font-medium uppercase hover:text-gray-600 transition-colors"
              >
                Apply Coupon
              </button>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-8 py-3 bg-white border border-black text-black text-sm uppercase tracking-wider font-medium hover:bg-black hover:text-white transition-colors rounded-sm"
            >
              Update Cart
            </button>
          </div>
        </div>

        {/* Right Column: Cart Totals */}
        <div className="w-full lg:w-[400px] flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            <h2 className="text-xl font-medium mb-6">Cart totals</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">SUBTOTAL</span>
                <span className="text-black">$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 text-green-600">
                  <span className="font-medium">DISCOUNT (10%)</span>
                  <span>-$ {discount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium mt-1">SHIPPING</span>
                <div className="text-right flex-1 ml-4 text-gray-500">
                  <p className="mb-2">Shipping costs will be calculated once you have provided address.</p>
                  
                  {/* Mock Calculate Shipping Dropdown */}
                  <div 
                    onClick={() => setIsShippingExpanded(!isShippingExpanded)}
                    className="flex items-center justify-end gap-2 text-black cursor-pointer hover:text-gray-600 transition-colors mt-4"
                  >
                    <span className="font-medium text-[13px]">CALCULATE SHIPPING</span>
                    <motion.svg 
                      animate={{ rotate: isShippingExpanded ? 180 : 0 }}
                      width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </div>

                  <AnimatePresence>
                    {isShippingExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 text-left space-y-3"
                      >
                        <select className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent">
                          <option>Select a country</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                        </select>
                        <input type="text" placeholder="City" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent" />
                        <input type="text" placeholder="Post Code / ZIP" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent" />
                        <button className="w-full mt-4 py-2 bg-white border border-black text-black text-xs uppercase tracking-wider font-medium hover:bg-black hover:text-white transition-colors rounded-sm">
                          Update Totals
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-black font-medium">TOTAL</span>
                <span className="text-black font-medium text-lg">$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Link 
              to={cartItems.length > 0 ? "/checkout" : "#"}
              className={`block w-full py-4 text-center text-sm uppercase tracking-wider font-medium rounded-sm transition-colors ${
                cartItems.length > 0 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
