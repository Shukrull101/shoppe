import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('direct-bank-transfer');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [phone, setPhone] = useState('');
  
  // Shipping cost matches design (Free shipping)
  const shippingCost = 0;
  const finalTotal = cartTotal + shippingCost - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ALIF10') {
      setDiscount(cartTotal * 0.1);
      alert('Coupon ALIF10 applied! 10% discount.');
    } else {
      alert('Invalid coupon code. Try ALIF10.');
      setDiscount(0);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    clearCart();
    navigate('/order-confirmation');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="text-3xl font-medium mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">You cannot proceed to checkout with an empty cart.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors rounded-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-[32px] font-medium text-center mb-10 animate-fade-in-up">Checkout</h1>

      {/* Top Banner (Returning customer / Coupon) */}
      <div className="max-w-xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <p className="text-gray-600 mb-2">Returning customer? <span className="text-black font-medium cursor-pointer hover:underline">Click here to login</span></p>
        <p className="text-gray-600 mb-6">Have a coupon? <span className="text-black font-medium cursor-pointer hover:underline">Click here to enter your code</span></p>
        
        <div className="border border-gray-200 p-6 rounded-sm">
          <p className="text-gray-600 mb-4 text-sm">If you have a coupon code, please apply it below. (Hint: Try ALIF10)</p>
          <form onSubmit={handleApplyCoupon} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Coupon Code" 
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              className="flex-1 border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
            />
            <button type="submit" className="px-6 py-2 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors rounded-sm">
              Apply Coupon
            </button>
          </form>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12 lg:gap-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        
        {/* Left Column: Billing Details */}
        <div className="flex-1">
          <h2 className="text-xl font-medium mb-8">Billing Details</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First name *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
              <input type="text" placeholder="Last name *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
            </div>
            
            <input type="text" placeholder="Company Name" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" />
            
            <div className="relative">
              <select className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors appearance-none bg-transparent" required>
                <option value="">Country *</option>
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            <input type="text" placeholder="Street Address *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
            <input type="text" placeholder="Postcode / ZIP *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
            <input type="text" placeholder="Town / City *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
            
            <PhoneInput
              placeholder="Phone *"
              value={phone}
              onChange={setPhone}
              defaultCountry="US"
              limitMaxLength={true}
              className="w-full border-b border-gray-300 py-2 text-sm outline-none focus-within:border-black transition-colors PhoneInput-custom"
              required
            />
            
            <input type="email" placeholder="Email *" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />

            <div className="pt-4 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-black transition-colors">
                  <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
                </div>
                <span className="text-sm text-black">Create an account?</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-black transition-colors">
                  <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
                </div>
                <span className="text-sm text-black">Ship to a different address?</span>
              </label>
            </div>

            <div className="pt-4">
              <textarea 
                placeholder="Order notes" 
                rows="3"
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right Column: Your Order */}
        <div className="w-full lg:w-[480px] flex-shrink-0">
          <h2 className="text-xl font-medium mb-8">Your Order</h2>
          
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            {/* Items Header */}
            <div className="flex justify-between pb-4 border-b border-gray-200 text-sm font-medium text-gray-500 mb-6 tracking-wider">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6 text-sm text-gray-600">
              {cartItems.map(item => {
                const itemTotal = parseFloat(item.price.replace(/[^0-9,.]/g, '').replace(',', '.')) * item.quantity;
                return (
                  <div key={item.id} className="flex justify-between pb-4 border-b border-gray-100">
                    <span>{item.title} x {item.quantity}</span>
                    <span className="text-black font-medium">$ {itemTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="space-y-4 mb-8 text-sm">
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
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">SHIPPING</span>
                <span className="text-gray-500">{shippingCost === 0 ? 'Free shipping' : `$ ${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-black font-medium">TOTAL</span>
                <span className="text-black font-medium text-lg">$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 mb-10">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="direct-bank-transfer"
                  checked={paymentMethod === 'direct-bank-transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 w-3 h-3 text-black focus:ring-black accent-black" 
                />
                <div>
                  <span className="text-sm font-medium text-black block mb-2">Direct bank transfer</span>
                  {paymentMethod === 'direct-bank-transfer' && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  )}
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="check-payments"
                  checked={paymentMethod === 'check-payments'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-3 h-3 text-black focus:ring-black accent-black" 
                />
                <span className="text-sm text-black">Check payments</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-3 h-3 text-black focus:ring-black accent-black" 
                />
                <span className="text-sm text-black">Cash on delivery</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-3 h-3 text-black focus:ring-black accent-black" 
                  required
                />
                <span className="text-sm text-black flex items-center gap-2">
                  PayPal <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="alif-pay"
                  checked={paymentMethod === 'alif-pay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-3 h-3 text-black focus:ring-black accent-black" 
                  required
                />
                <span className="text-sm text-black flex items-center gap-2 font-medium text-green-600">
                  Alif Pay
                </span>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-black text-white text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors rounded-sm"
            >
              Place Order
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
