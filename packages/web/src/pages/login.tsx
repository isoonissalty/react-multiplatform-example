import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import WebLoginForm from '../platform/LoginForm';
import useAuth from '../platform/useAuth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, login } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your account to continue
        </p>
      </div>

      <WebLoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error || undefined}
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Demo credentials: demo@example.com / password123
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 