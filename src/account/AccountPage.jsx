import React from 'react';
import { useAccount } from './AccountContext';
import AuthPage from './AuthPage';
import AccountLayout from './AccountLayout';

export default function AccountPage() {
  const { isAuthenticated } = useAccount();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <AccountLayout />;
}
