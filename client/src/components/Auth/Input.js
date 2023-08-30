import React from 'react';
import { useState } from 'react';
import { Grid, EyeIcon, EyeOffIcon } from 'react-icons'; // Replace with appropriate React icons

const Input = ({ name, handleChange, label, half, autoFocus, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`grid ${half ? 'grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        name={name}
        onChange={handleChange}
        required
        autoFocus={autoFocus}
        type={type}
        placeholder={label}
      />
      {name === 'password' && (
        <button
          type="button"
          onClick={handleShowPassword}
          className="flex items-center justify-center w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

export default Input;
