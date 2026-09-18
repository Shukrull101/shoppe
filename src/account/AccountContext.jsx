import React, { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext(null);

const STORAGE_KEY = 'shoppe_accounts_multi_v1';

const initialOrders = [
  {
    id: '7643980998990',
    date: 'October 8, 2021',
    status: 'Delivered',
    total: 105,
    items: [
      { name: 'Lira Earrings', price: 20, qty: 1 },
      { name: 'Hal Earrings', price: 25, qty: 1 },
      { name: 'Kaede Hair Pin Set', price: 30, qty: 2 },
    ],
  },
  {
    id: '943980998990',
    date: 'October 8, 2021',
    status: 'Processing',
    total: 100,
    items: [
      { name: 'Gold Link Bracelet', price: 50, qty: 2 },
    ],
  },
  {
    id: '879980998990',
    date: 'October 8, 2020',
    status: 'Delivered',
    total: 65,
    items: [
      { name: 'Minimalist Chain Necklace', price: 65, qty: 1 },
    ],
  },
];

const initialDownloads = [
  {
    id: '7643980998990',
    date: 'October 8, 2021',
    status: 'Delivered',
    total: 105,
    file: 'Shoppe_Lookbook_2021.pdf',
    downloadUrl: '#',
  },
  {
    id: '943980998990',
    date: 'October 8, 2021',
    status: 'Processing',
    total: 100,
    file: 'Care_Guide_Jewelry.pdf',
    downloadUrl: '#',
  },
  {
    id: '879980998990',
    date: 'October 8, 2020',
    status: 'Delivered',
    total: 65,
    file: 'Warranty_Certificate_87998.pdf',
    downloadUrl: '#',
  },
];

const defaultAccounts = {
  'vitatheme@gmail.com': {
    user: {
      firstName: 'Vitatheme',
      lastName: '',
      displayName: 'Vitatheme',
      email: 'vitatheme@gmail.com',
    },
    orders: initialOrders,
    downloads: initialDownloads,
    billingAddress: null,
    shippingAddress: null,
  },
};

export function AccountProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading accounts from storage', e);
    }
    return {
      currentEmail: null,
      isAuthenticated: false,
      accounts: defaultAccounts,
    };
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving accounts to storage', e);
    }
  }, [state]);

  const login = (email, _password) => {
    const cleanEmail = (email || 'vitatheme@gmail.com').trim().toLowerCase();
    setState((prev) => {
      const existing = prev.accounts[cleanEmail];
      let accountData = existing;
      if (!accountData) {
        const displayName = cleanEmail.split('@')[0] || 'User';
        accountData = {
          user: {
            firstName: displayName,
            lastName: '',
            displayName,
            email: cleanEmail,
          },
          orders: [],
          downloads: [],
          billingAddress: null,
          shippingAddress: null,
        };
      }
      return {
        ...prev,
        currentEmail: cleanEmail,
        isAuthenticated: true,
        accounts: {
          ...prev.accounts,
          [cleanEmail]: accountData,
        },
      };
    });
    return true;
  };

  const register = (email, _password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const displayName = cleanEmail.split('@')[0] || 'User';
    setState((prev) => ({
      ...prev,
      currentEmail: cleanEmail,
      isAuthenticated: true,
      accounts: {
        ...prev.accounts,
        [cleanEmail]: {
          user: {
            firstName: displayName,
            lastName: '',
            displayName,
            email: cleanEmail,
          },
          orders: [],
          downloads: [],
          billingAddress: null,
          shippingAddress: null,
        },
      },
    }));
    return true;
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      currentEmail: null,
    }));
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const updateAccountDetails = (newDetails) => {
    setState((prev) => {
      const email = prev.currentEmail;
      if (!email || !prev.accounts[email]) return prev;
      return {
        ...prev,
        accounts: {
          ...prev.accounts,
          [email]: {
            ...prev.accounts[email],
            user: {
              ...prev.accounts[email].user,
              ...newDetails,
            },
          },
        },
      };
    });
  };

  const saveAddress = (type, addressData) => {
    setState((prev) => {
      const email = prev.currentEmail;
      if (!email || !prev.accounts[email]) return prev;
      const key = type === 'billing' ? 'billingAddress' : 'shippingAddress';
      return {
        ...prev,
        accounts: {
          ...prev.accounts,
          [email]: {
            ...prev.accounts[email],
            [key]: addressData,
          },
        },
      };
    });
  };

  const toggleEmptyOrders = () => {
    setState((prev) => {
      const email = prev.currentEmail;
      if (!email || !prev.accounts[email]) return prev;
      const curOrders = prev.accounts[email].orders || [];
      return {
        ...prev,
        accounts: {
          ...prev.accounts,
          [email]: {
            ...prev.accounts[email],
            orders: curOrders.length > 0 ? [] : initialOrders,
          },
        },
      };
    });
  };

  const toggleEmptyDownloads = () => {
    setState((prev) => {
      const email = prev.currentEmail;
      if (!email || !prev.accounts[email]) return prev;
      const curDownloads = prev.accounts[email].downloads || [];
      return {
        ...prev,
        accounts: {
          ...prev.accounts,
          [email]: {
            ...prev.accounts[email],
            downloads: curDownloads.length > 0 ? [] : initialDownloads,
          },
        },
      };
    });
  };

  // Get data for currently active account
  const currentAccount = (state.currentEmail && state.accounts[state.currentEmail]) || {
    user: {
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
    },
    orders: [],
    downloads: [],
    billingAddress: null,
    shippingAddress: null,
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: currentAccount.user,
        orders: currentAccount.orders,
        downloads: currentAccount.downloads,
        billingAddress: currentAccount.billingAddress,
        shippingAddress: currentAccount.shippingAddress,
        isLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        confirmLogout,
        login,
        register,
        logout,
        updateAccountDetails,
        saveAddress,
        toggleEmptyOrders,
        toggleEmptyDownloads,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
