import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createButton, ButtonProps } from '@root/shared/components/Button';

// Mobile-specific implementation of Button
const MobileButton = createButton((props: ButtonProps) => {
  const { title, onPress, disabled, variant = 'primary' } = props;

  // Get style based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primaryButton];
      case 'secondary':
        return [styles.button, styles.secondaryButton];
      case 'outline':
        return [styles.button, styles.outlineButton];
      default:
        return [styles.button, styles.primaryButton];
    }
  };

  // Get text style based on variant
  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return [styles.buttonText, styles.outlineButtonText];
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6', // blue-500
  },
  secondaryButton: {
    backgroundColor: '#6b7280', // gray-500
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6', // blue-500
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButtonText: {
    color: '#3b82f6', // blue-500
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default MobileButton;
