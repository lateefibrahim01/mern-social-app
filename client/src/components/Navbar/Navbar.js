import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiLogOut, FiUser } from 'react-icons/fi'; // Replace with appropriate React icons
import decode from 'jwt-decode'; // Make sure to import decode

import image from '../../images/image.png';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user]);

  return (
    <div className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            My App
          </Link>
          <img src={image} alt="icon" className="h-16" />
        </div>
        <div className="flex items-center justify-between">
          {user?.result ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  {user?.result.name.charAt(0)}
                </div>
                <p className="text-gray-800 font-medium">{user?.result.name}</p>
              </div>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={logout}
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <FiUser className="w-5 h-5 mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
