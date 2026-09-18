import React, { useState } from 'react';
import { useAccount } from './AccountContext';
import DashboardTab from './tabs/DashboardTab';
import OrdersTab from './tabs/OrdersTab';
import DownloadsTab from './tabs/DownloadsTab';
import AddressesTab from './tabs/AddressesTab';
import AccountDetailsTab from './tabs/AccountDetailsTab';
import LogoutModal from './LogoutModal';

export default function AccountLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { openLogoutModal } = useAccount();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'details', label: 'Account details' },
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Page Title */}
        <h1 className="text-[32px] md:text-[38px] font-normal text-black text-center mb-10 tracking-tight">
          My Account
        </h1>

        {/* Tab Navigation matching Figma */}
        <div className="border-b border-[#D8D8D8] mb-12">
          <nav className="flex items-center justify-start md:justify-center gap-7 sm:gap-10 overflow-x-auto whitespace-nowrap scrollbar-none px-2 -mb-[1px]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`pb-3 text-[16px] transition-all cursor-pointer bg-transparent border-0 relative ${
                    isActive
                      ? 'text-black font-medium'
                      : 'text-[#707070] hover:text-black font-normal'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                  )}
                </button>
              );
            })}

            {/* Logout button in navigation triggering modal */}
            <button
              onClick={openLogoutModal}
              className="pb-3 text-[16px] text-[#707070] hover:text-black font-normal transition-all cursor-pointer bg-transparent border-0"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Active Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'dashboard' && <DashboardTab setActiveTab={setActiveTab} />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'downloads' && <DownloadsTab />}
          {activeTab === 'addresses' && <AddressesTab />}
          {activeTab === 'details' && <AccountDetailsTab />}
        </div>
      </div>

      {/* Logout confirmation modal */}
      <LogoutModal />
    </div>
  );
}
