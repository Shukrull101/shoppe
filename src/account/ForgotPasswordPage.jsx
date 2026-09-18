import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[480px] mx-auto px-4 py-16 md:py-24 text-center">
        {/* Title matching Figma */}
        <h1 className="text-[28px] sm:text-[34px] font-normal text-black mb-6 tracking-tight">
          Have you Forgotten Your Password ?
        </h1>

        {/* Subtitle matching Figma */}
        <p className="text-[15px] sm:text-[16px] text-black leading-relaxed max-w-[420px] mx-auto mb-14 font-normal">
          If you've forgotten your password, enter your e-mail address and we'll send you an e-mail
        </p>

        {submitted ? (
          <div className="bg-[#F9F9F9] border border-[#E5E5E5] p-8 rounded-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-[18px] font-medium text-black">Email Sent</h3>
            <p className="text-[14px] text-[#707070] leading-relaxed">
              We have sent a password reset link to <strong className="text-black">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Link
                to="/profile"
                className="inline-block bg-black text-white text-[13px] font-medium tracking-[1px] uppercase px-8 py-3 rounded-xs hover:bg-neutral-800 transition-colors"
              >
                Back to Sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-8">
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
                required
                className="w-full border-b border-[#D8D8D8] py-3 text-[14px] text-black outline-none placeholder:text-[#707070] focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white text-[14px] font-medium tracking-[1px] uppercase py-3.5 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              RESET PASSWORD
            </button>

            <div className="text-center pt-2">
              <Link
                to="/profile"
                className="text-[14px] text-[#707070] hover:text-black transition-colors inline-block"
              >
                ← Back to Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
