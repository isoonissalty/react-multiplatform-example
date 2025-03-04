import React, { useState } from 'react';
import { 
  createLoginForm, 
  LoginFormProps, 
  validateEmail, 
  validatePassword 
} from '@root/shared/components/LoginForm';
import WebButton from './Button';

// Web-specific implementation of LoginForm
const WebLoginForm = createLoginForm((props: LoginFormProps) => {
  const { onSubmit, isLoading, error } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    if (isValid) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`shadow appearance-none border ${
              emailError ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {emailError && (
            <p className="text-red-500 text-xs italic mt-1">{emailError}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`shadow appearance-none border ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {passwordError && (
            <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <WebButton
            title={isLoading ? 'Logging in...' : 'Sign In'}
            onPress={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
            disabled={isLoading}
            variant="primary"
          />
          <a 
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
});

export default WebLoginForm; 