'use client';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ register, name, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(name, {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
export default PasswordInput;
