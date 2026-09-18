import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from './AccountContext';
import RegisterForm from './RegisterForm';

export default function AuthPage({ initialTab = 'signin' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState(initialTab);
  const { login } = useAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const contentRef = useRef(null);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab || isAnimating) return;
    setError('');

    // Fade out
    setIsAnimating(true);
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = tab === 'register' ? 'translateX(-10px)' : 'translateX(10px)';
    }

    setTimeout(() => {
      setActiveTab(tab);
      setDisplayedTab(tab);
      // Fade in from opposite side
      if (contentRef.current) {
        contentRef.current.style.transition = 'none';
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = tab === 'register' ? 'translateX(10px)' : 'translateX(-10px)';
        // Force reflow
        contentRef.current.getBoundingClientRect();
        contentRef.current.style.transition = 'opacity 220ms ease, transform 220ms ease';
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateX(0)';
      }
      setTimeout(() => setIsAnimating(false), 220);
    }, 180);
  };

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
        {/* Title */}
        <h1 className="text-[32px] md:text-[36px] font-normal text-black mb-10 tracking-tight">
          My account
        </h1>

        {/* Tab Toggle — animated sliding pill */}
        <div className="relative bg-[#EFEFEF] p-1.5 rounded-[8px] flex mb-12">
          {/* Sliding white background */}
          <div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-[6px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            style={{
              left: activeTab === 'signin' ? '6px' : 'calc(50% + 0px)',
              transition: 'left 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <button
            type="button"
            onClick={() => handleTabSwitch('signin')}
            className="relative flex-1 py-3 text-[15px] rounded-[6px] cursor-pointer border-0 bg-transparent z-10"
            style={{
              color: activeTab === 'signin' ? '#000000' : '#707070',
              fontWeight: activeTab === 'signin' ? '500' : '400',
              transition: 'color 250ms ease, font-weight 250ms ease',
            }}
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('register')}
            className="relative flex-1 py-3 text-[15px] rounded-[6px] cursor-pointer border-0 bg-transparent z-10"
            style={{
              color: activeTab === 'register' ? '#000000' : '#707070',
              fontWeight: activeTab === 'register' ? '500' : '400',
              transition: 'color 250ms ease, font-weight 250ms ease',
            }}
          >
            Register
          </button>
        </div>

        {/* Tab Content with fade+slide animation */}
        <div
          ref={contentRef}
          style={{
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'opacity 220ms ease, transform 220ms ease',
            willChange: 'opacity, transform',
          }}
        >
          {displayedTab === 'signin' ? (
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
    </div>
  );
}
