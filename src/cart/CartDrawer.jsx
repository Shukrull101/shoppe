import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Фон (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Сама панель корзины */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] flex flex-col shadow-2xl"
          >
            {/* Шапка корзины */}
            <div className="p-6 md:p-8 flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-medium mb-1">Shopping bag</h2>
              <p className="text-gray-500 text-sm">{cartCount} items</p>
            </div>

            {/* Список товаров (прокручиваемый) */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 space-y-8">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={item.id}
                    className="flex gap-4 relative group"
                  >
                    {/* Картинка */}
                    <div className="w-24 h-32 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                      )}
                    </div>

                    {/* Информация */}
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-normal text-black pr-6">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-1 right-0 text-gray-400 hover:text-black transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-3">Black / Medium</p>
                      <p className="text-[#A18A68] font-medium mb-auto">{item.price}</p>
                      
                      {/* Управление количеством */}
                      <div className="flex items-center gap-4 text-sm mt-2">
                        <span className="text-gray-500">QTY:</span>
                        <div className="flex items-center bg-gray-50 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >-</button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cartItems.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                  Your cart is currently empty.
                </div>
              )}
            </div>

            {/* Подвал корзины */}
            <div className="p-6 md:p-8 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="flex justify-between items-center mb-6">
                <span className="text-black font-medium text-[16px]">Subtotal ({cartCount} items)</span>
                <span className="text-black font-medium text-[16px]">
                  $ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button 
                onClick={handleViewCart}
                className="w-full bg-white border border-black text-black py-4 uppercase tracking-wider text-sm font-medium hover:bg-black hover:text-white transition-colors rounded-sm"
              >
                View Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
