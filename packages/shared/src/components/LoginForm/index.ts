import React from 'react';

// Define the common interface for login form across platforms
export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

// Define the abstract component that will be implemented per platform
export interface LoginFormComponent {
  (props: LoginFormProps): React.ReactElement | null;
}

// This allows us to create platform-specific implementations
// of the LoginForm component while maintaining type safety
export const createLoginForm = (implementation: LoginFormComponent): LoginFormComponent => implementation;

// Shared validation logic
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
}; 