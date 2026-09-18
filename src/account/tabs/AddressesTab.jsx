import React, { useState } from 'react';
import { useAccount } from '../AccountContext';

export default function AddressesTab() {
  const { billingAddress, shippingAddress, saveAddress } = useAccount();
  const [editingType, setEditingType] = useState(null); // 'billing' | 'shipping' | null

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    street: '',
    postcode: '',
    city: '',
    phone: '',
    email: '',
  });

  const handleStartEdit = (type) => {
    const current = type === 'billing' ? billingAddress : shippingAddress;
    if (current) {
      setFormData(current);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        country: 'United States (US)',
        street: '',
        postcode: '',
        city: '',
        phone: '',
        email: '',
      });
    }
    setEditingType(type);
  };

  // Only allow digits (0-9)
  const handleNumericKeyDown = (e) => {
    const allowed = ['Backspace', 'Tab', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Only allow digits and leading '+'
  const handlePhoneKeyDown = (e) => {
    const allowed = ['Backspace', 'Tab', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (e.key === '+' && e.target.selectionStart === 0 && !e.target.value.includes('+')) {
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'postcode') {
      const onlyDigits = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, postcode: onlyDigits }));
      return;
    }
    if (name === 'phone') {
      const onlyPhone = value.replace(/(?!^\+)\D/g, '');
      setFormData((prev) => ({ ...prev, phone: onlyPhone }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.street) {
      alert('Please fill in required fields (First name, Last name, Street address)');
      return;
    }
    saveAddress(editingType, formData);
    setEditingType(null);
  };

  return (
    <div className="text-left max-w-[950px] mx-auto py-4">
      <p className="text-[15px] text-[#707070] mb-8 leading-relaxed">
        The following addresses will be used on the checkout page by default.
      </p>

      {/* If editing an address, show the Figma address form */}
      {editingType ? (
        <div className="bg-white border border-[#E5E5E5] p-6 sm:p-10 rounded-xs mb-8">
          <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4 mb-6">
            <h3 className="text-[20px] font-medium text-black capitalize">
              {editingType === 'billing' ? 'Billing Address' : 'Shipping Address'}
            </h3>
            <button
              onClick={() => setEditingType(null)}
              className="text-sm text-[#707070] hover:text-black underline cursor-pointer bg-transparent border-0"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-black mb-1.5">
                Company Name (optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-black mb-1.5">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors bg-white"
              >
                <option value="United States (US)">United States (US)</option>
                <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-black mb-1.5">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                placeholder="House number and street name"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors placeholder:text-[#999]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  Postcode / ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Only numbers (e.g. 10001)"
                  value={formData.postcode}
                  onKeyDown={handleNumericKeyDown}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors placeholder:text-[#999]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  placeholder="Only numbers (e.g. +1234567890)"
                  value={formData.phone}
                  onKeyDown={handlePhoneKeyDown}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors placeholder:text-[#999]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-black mb-1.5">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#D8D8D8] py-2 text-[14px] text-black outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-black text-white text-[13px] font-medium tracking-[1px] uppercase px-8 py-3.5 rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                SAVE ADDRESS
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Two cards: Billing and Shipping addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Billing address card */}
        <div className="border-t border-[#E5E5E5] pt-6">
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="text-[20px] font-normal text-black">
              Billing address
            </h4>
            <button
              onClick={() => handleStartEdit('billing')}
              className="text-[14px] font-medium text-black hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              {billingAddress ? 'EDIT' : 'ADD'}
            </button>
          </div>

          {billingAddress ? (
            <div className="text-[14px] text-[#707070] space-y-1 leading-relaxed">
              <p className="font-medium text-black">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>
              {billingAddress.company && <p>{billingAddress.company}</p>}
              <p>{billingAddress.street}</p>
              <p>
                {billingAddress.city}, {billingAddress.postcode}
              </p>
              <p>{billingAddress.country}</p>
              <p className="pt-2">{billingAddress.phone}</p>
              <p>{billingAddress.email}</p>
            </div>
          ) : (
            <p className="text-[14px] text-[#707070]">
              You have not set up this type of address yet.
            </p>
          )}
        </div>

        {/* Shipping address card */}
        <div className="border-t border-[#E5E5E5] pt-6">
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="text-[20px] font-normal text-black">
              Shipping address
            </h4>
            <button
              onClick={() => handleStartEdit('shipping')}
              className="text-[14px] font-medium text-black hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              {shippingAddress ? 'EDIT' : 'ADD'}
            </button>
          </div>

          {shippingAddress ? (
            <div className="text-[14px] text-[#707070] space-y-1 leading-relaxed">
              <p className="font-medium text-black">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              {shippingAddress.company && <p>{shippingAddress.company}</p>}
              <p>{shippingAddress.street}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.postcode}
              </p>
              <p>{shippingAddress.country}</p>
              <p className="pt-2">{shippingAddress.phone}</p>
              <p>{shippingAddress.email}</p>
            </div>
          ) : (
            <p className="text-[14px] text-[#707070]">
              You have not set up this type of address yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
