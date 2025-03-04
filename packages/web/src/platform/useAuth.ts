import { createUseAuth } from '@root/shared/hooks/useAuth';

// Mock API call for demonstration purposes
const mockLoginApi = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, accept any email with valid format and password longer than 6 chars
  if (email === 'demo@example.com' && password === 'password123') {
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

// Create the web-specific useAuth hook
const useAuth = createUseAuth(mockLoginApi);

export default useAuth; 