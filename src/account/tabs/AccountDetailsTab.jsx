import React, { useState } from 'react';
import { useAccount } from '../AccountContext';

export default function AccountDetailsTab() {
  const { user, updateAccountDetails } = useAccount();

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    displayName: user.displayName || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setStatusMessage({ type: 'error', text: 'New passwords do not match!' });
        return;
      }
    }

    updateAccountDetails({
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
      email: formData.email,
    });

    setStatusMessage({ type: 'success', text: 'Account details updated successfully.' });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="text-left max-w-[850px] mx-auto py-4">
      <h3 className="text-[24px] font-normal text-black mb-8">
        Account details
      </h3>

      {statusMessage && (
        <div
          className={`p-4 mb-8 text-sm rounded-xs border ${
            statusMessage.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-[14px] text-black mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border-b border-[#D8D8D8] py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[14px] text-black mb-1">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border-b border-[#D8D8D8] py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[14px] text-black mb-1">
            Display name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full border-b border-[#D8D8D8] py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors"
          />
          <p className="text-[12px] text-[#707070] italic mt-2">
            This will be how your name will be displayed in the account section and in reviews.
          </p>
        </div>

        <div>
          <label className="block text-[14px] text-black mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-b border-[#D8D8D8] py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="pt-6 border-t border-[#E5E5E5]">
          <h4 className="text-[18px] font-normal text-black mb-6">
            Password change
          </h4>

          <div className="space-y-6">
            <div>
              <label className="block text-[13px] text-black mb-1">
                Current password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-black mb-1">
                New password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-black mb-1">
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-black text-white text-[13px] font-medium tracking-[1px] uppercase px-10 py-3.5 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
}
