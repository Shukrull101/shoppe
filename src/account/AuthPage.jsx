import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from './AccountContext';
import RegisterForm from './RegisterForm';

export default function AuthPage({ initialTab = 'signin' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { login } = useAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    login(email, password);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[480px] mx-auto px-4 py-16 md:py-24 text-center">
        {/* Title matching Figma */}
        <h1 className="text-[32px] md:text-[36px] font-normal text-black mb-10 tracking-tight">
          My account
        </h1>

        {/* Tab Toggle (Sign in / Register) matching screenshot */}
        <div className="bg-[#EFEFEF] p-1.5 rounded-[8px] flex mb-12">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setError('');
            }}
            className={`flex-1 py-3 text-[15px] rounded-[6px] transition-all cursor-pointer border-0 ${
              activeTab === 'signin'
                ? 'bg-white text-black font-medium shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                : 'bg-transparent text-[#707070] font-normal hover:text-black'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
            className={`flex-1 py-3 text-[15px] rounded-[6px] transition-all cursor-pointer border-0 ${
              activeTab === 'register'
                ? 'bg-white text-black font-medium shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                : 'bg-transparent text-[#707070] font-normal hover:text-black'
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="text-left space-y-7">
            {error && (
              <div className="bg-red-50 text-red-800 text-xs p-3 rounded-xs border border-red-200">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-[#D8D8D8] py-3 text-[14px] text-black outline-none placeholder:text-[#707070] focus:border-black transition-colors"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[#D8D8D8] py-3 text-[14px] text-black outline-none placeholder:text-[#707070] focus:border-black transition-colors"
              />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#D8D8D8] accent-black cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-[14px] text-black cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white text-[14px] font-medium tracking-[1px] uppercase py-3.5 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer mt-4"
            >
              SIGN IN
            </button>

            <div className="text-center pt-2">
              <Link
                to="/forgot-password"
                className="text-[14px] text-black hover:opacity-75 transition-opacity inline-block"
              >
                Have you forgotten your password?
              </Link>
            </div>
          </form>
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}
