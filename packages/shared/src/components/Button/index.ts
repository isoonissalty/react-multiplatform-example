import React from 'react';

// Define the common interface for buttons across platforms
interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Define the abstract component that will be implemented per platform
interface ButtonComponent {
  (props: ButtonProps): React.ReactElement | null;
}

// This allows us to create platform-specific implementations
// of the Button component while maintaining type safety
export const createButton = (implementation: ButtonComponent): ButtonComponent => implementation;

// Export the ButtonProps type for use in platform-specific implementations
export type { ButtonProps, ButtonComponent };
