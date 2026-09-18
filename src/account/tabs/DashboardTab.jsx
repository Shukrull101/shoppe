import React from 'react';
import { useAccount } from '../AccountContext';

export default function DashboardTab({ setActiveTab }) {
  const { user, openLogoutModal } = useAccount();

  return (
    <div className="text-left max-w-[850px] mx-auto py-4">
      <p className="text-[16px] text-black leading-relaxed mb-6 font-normal">
        Hello <span className="font-medium">{user.displayName || user.firstName || 'Vitatheme'}</span>{' '}
        <span className="text-[#707070]">
          (not {user.displayName || user.firstName || 'Vitatheme'}?{' '}
          <button
            onClick={openLogoutModal}
            className="text-black hover:underline cursor-pointer font-normal inline bg-transparent p-0 border-0"
          >
            Log out
          </button>
          )
        </span>
      </p>

      <p className="text-[15px] text-[#707070] leading-[26px]">
        From your account dashboard you can view your{' '}
        <button
          onClick={() => setActiveTab('orders')}
          className="text-black hover:underline font-normal inline cursor-pointer bg-transparent p-0 border-0"
        >
          recent orders
        </button>
        , manage your{' '}
        <button
          onClick={() => setActiveTab('addresses')}
          className="text-black hover:underline font-normal inline cursor-pointer bg-transparent p-0 border-0"
        >
          shipping and billing addresses
        </button>
        , and edit your{' '}
        <button
          onClick={() => setActiveTab('details')}
          className="text-black hover:underline font-normal inline cursor-pointer bg-transparent p-0 border-0"
        >
          password and account details
        </button>
        .
      </p>

      {/* Quick shortcuts / feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
        <div
          onClick={() => setActiveTab('orders')}
          className="border border-[#E5E5E5] p-6 rounded-xs hover:border-black transition-all cursor-pointer bg-white group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h4 className="text-[16px] font-medium text-black mb-1">Orders</h4>
          <p className="text-[13px] text-[#707070]">Check your recent purchases and statuses</p>
        </div>

        <div
          onClick={() => setActiveTab('addresses')}
          className="border border-[#E5E5E5] p-6 rounded-xs hover:border-black transition-all cursor-pointer bg-white group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-[16px] font-medium text-black mb-1">Addresses</h4>
          <p className="text-[13px] text-[#707070]">Manage your billing and shipping addresses</p>
        </div>

        <div
          onClick={() => setActiveTab('details')}
          className="border border-[#E5E5E5] p-6 rounded-xs hover:border-black transition-all cursor-pointer bg-white group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h4 className="text-[16px] font-medium text-black mb-1">Account details</h4>
          <p className="text-[13px] text-[#707070]">Update name, email and security password</p>
        </div>
      </div>
    </div>
  );
}
