import React, { useState } from 'react';
import { useAccount } from './AccountContext';

export default function RegisterForm() {
  const { register } = useAccount();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    register(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-6">
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

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border-b border-[#D8D8D8] py-3 text-[14px] text-black outline-none placeholder:text-[#707070] focus:border-black transition-colors"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border-b border-[#D8D8D8] py-3 text-[14px] text-black outline-none placeholder:text-[#707070] focus:border-black transition-colors"
        />
      </div>

      <p className="text-[12px] text-[#707070] leading-relaxed pt-2">
        A link to set a new password will be sent to your email address. Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
      </p>

      <button
        type="submit"
        className="w-full bg-black text-white text-[14px] font-medium tracking-[1px] uppercase py-3.5 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer mt-4"
      >
        REGISTER
      </button>
    </form>
  );
}
