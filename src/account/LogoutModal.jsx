import React from 'react';
import { useAccount } from './AccountContext';

export default function LogoutModal() {
  const { isLogoutModalOpen, closeLogoutModal, confirmLogout } = useAccount();

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white max-w-[440px] w-full rounded-xs shadow-2xl p-6 sm:p-8 text-center relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.8" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
        </div>

        <h3 className="text-[22px] font-medium text-black mb-2">
          Log out of Shoppe?
        </h3>
        <p className="text-[14px] text-[#707070] leading-relaxed mb-8">
          Are you sure you want to log out? You will need to sign in again to view your orders, addresses, and account details.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={closeLogoutModal}
            className="flex-1 border border-[#D8D8D8] text-black text-[13px] font-medium tracking-[1px] uppercase py-3 rounded-xs hover:bg-[#F5F5F5] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmLogout}
            className="flex-1 bg-black text-white text-[13px] font-medium tracking-[1px] uppercase py-3 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
