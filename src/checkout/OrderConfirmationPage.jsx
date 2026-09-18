import React from 'react';
import { Link } from 'react-router-dom';

export function OrderConfirmationPage() {
  // Mock order details
  const orderDetails = {
    orderNumber: '1879605573994',
    email: 'Vitathemes@gmail.com',
    paymentMethod: 'Mastercard*************7865',
    orderDate: 'October 8, 2020',
    deliveryOptions: 'Standard delivery',
    deliveryAddress: ['Kristian holst 34', 'old street W1F', '7NU london', 'United Kingdom'],
    contactNumber: '+44 8749790988'
  };

  // Mock summary from the design
  const orderItems = [
    { id: 1, title: 'Lira Earrings', price: '$64' },
    { id: 2, title: 'Ollie Earrings', price: '$10' },
    { id: 3, title: 'Kaede Hair Pin', price: '$10' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      
      {/* Success Banner */}
      <div className="bg-[#F8F9FA] border-l-2 border-black p-4 mb-16 flex items-center gap-4 animate-fade-in-up">
        <div className="text-[#A18A68]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <p className="text-black text-sm">We've received your order</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        {/* Left Column: Order Details */}
        <div className="flex-1">
          <h2 className="text-[22px] font-normal mb-8 text-black">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 text-sm">
            
            {/* Column 1 */}
            <div className="space-y-10">
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">ORDER NUMBER</p>
                <p className="text-gray-600">{orderDetails.orderNumber}</p>
              </div>
              
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">EMAIL</p>
                <p className="text-gray-600">{orderDetails.email}</p>
              </div>
              
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">PAYMENT METHOD</p>
                <p className="text-gray-600">{orderDetails.paymentMethod}</p>
              </div>
              
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">ORDER DATE</p>
                <p className="text-gray-600">{orderDetails.orderDate}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-10">
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">DELIVERY OPTIONS</p>
                <p className="text-gray-600">{orderDetails.deliveryOptions}</p>
              </div>
              
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">DELIVERY ADDRESS</p>
                <div className="text-gray-600 space-y-1">
                  {orderDetails.deliveryAddress.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">CONTACT NUMBER</p>
                <p className="text-gray-600">{orderDetails.contactNumber}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[480px] flex-shrink-0">
          <h2 className="text-[22px] font-normal mb-8 text-black">Order Summary</h2>
          
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            {/* Header */}
            <div className="flex justify-between pb-4 border-b border-gray-200 text-sm font-medium text-black mb-6 tracking-wider">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-6 text-sm text-gray-500">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between pb-4 border-b border-gray-100">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-black font-medium tracking-wider">SUBTOTAL</span>
                <span className="text-gray-500">$85</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-black font-medium tracking-wider">SHIPPING</span>
                <span className="text-gray-500">Free shipping</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-black font-medium tracking-wider">TOTAL</span>
                <span className="text-black font-medium text-lg">$85</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link to="/shop" className="text-sm font-medium hover:text-gray-500 transition-colors underline underline-offset-4">
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
