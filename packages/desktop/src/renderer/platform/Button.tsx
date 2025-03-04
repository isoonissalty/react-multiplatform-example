import React from 'react';
import { createButton, ButtonProps } from '@root/shared/components/Button';

// Desktop-specific implementation of Button - in this case, very similar to web
// but could include desktop-specific enhancements
const DesktopButton = createButton((props: ButtonProps) => {
  const { title, onPress, disabled, variant = 'primary' } = props;

  // Map variant to CSS classes - with desktop-specific styling
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-800 text-white font-bold';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-800 text-white font-bold';
      case 'outline':
        return 'bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white border border-blue-600 hover:border-transparent';
      default:
        return 'bg-blue-600 hover:bg-blue-800 text-white font-bold';
    }
  };

  // Desktop-specific mousedown effect
  const handleMouseDown = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    button.style.transform = 'scale(0.97)';
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    button.style.transform = 'scale(1)';
  };

  return (
    <button
      className={`py-2 px-4 rounded transition-all ${getButtonClass()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onPress}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {title}
    </button>
  );
});

export default DesktopButton;
