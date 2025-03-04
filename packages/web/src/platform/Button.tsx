import React from 'react';
import { createButton, ButtonProps } from '@root/shared/components/Button';

// Web-specific implementation of Button
const WebButton = createButton((props: ButtonProps) => {
  const { title, onPress, disabled, variant = 'primary' } = props;

  // Map variant to CSS classes
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-700 text-white font-bold';
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-700 text-white font-bold';
      case 'outline':
        return 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent';
      default:
        return 'bg-blue-500 hover:bg-blue-700 text-white font-bold';
    }
  };

  return (
    <button
      className={`py-2 px-4 rounded ${getButtonClass()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onPress}
      disabled={disabled}
    >
      {title}
    </button>
  );
});

export default WebButton;
