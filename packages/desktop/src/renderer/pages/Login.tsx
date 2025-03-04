import React from 'react';
import { createLoginForm, LoginFormProps, validateEmail, validatePassword } from '@root/shared/components/LoginForm';
import { createUseAuth } from '@root/shared/hooks/useAuth';

// Desktop-specific login implementation
const loginImplementation = async (email: string, password: string) => {
  // In a real app, this would communicate with your authentication service
  // For this example, we'll simulate a successful login with a mock user
  console.log('Desktop login attempt:', email, password);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock authentication logic
  if (email === 'user@example.com' && password === 'password') {
    return {
      success: true,
      user: {
        email,
        name: 'Demo User',
      },
    };
  }
  
  return {
    success: false,
    error: 'Invalid email or password',
  };
};

// Create our auth hook with the desktop implementation
const useAuth = createUseAuth(loginImplementation);

// Desktop-specific login form implementation
const DesktopLoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      return;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    // Submit the form
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your email"
        />
        {emailError && <div className="error-message">{emailError}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your password"
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        type="submit" 
        className="login-button" 
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

// Create the login form component using our shared factory function
const LoginForm = createLoginForm(DesktopLoginForm);

// Main login page component
const LoginPage: React.FC = () => {
  const { login, isLoading, error, isAuthenticated, user } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  // If authenticated, show a welcome message
  if (isAuthenticated && user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome, {user.name || user.email}!</h1>
            <p>You have successfully logged in.</p>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the login form
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please log in to continue</p>
        </div>
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error || undefined}
        />
      </div>
    </div>
  );
};

export default LoginPage; 