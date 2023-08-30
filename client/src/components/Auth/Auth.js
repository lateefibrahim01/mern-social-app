import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { LockOutlined } from 'react-icons/fa'; // Replace with appropriate React icons
import { FaGoogle } from 'react-icons/fa'; // Replace with appropriate React icons
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="text-4xl">
            <LockOutlined />
          </div>
          <h1 className="text-2xl font-bold mt-4">{isSignup ? 'Sign up' : 'Sign in'}</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input
            name="password"
            label="Password"
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            handleShowPassword={handleShowPassword}
          />
          {isSignup && (
            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
          )}
          <button
            type="submit"
            className="w-full py-3 mt-4 font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="w-full py-3 mt-4 flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FaGoogle className="mr-2" />
                Google Sign In
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
