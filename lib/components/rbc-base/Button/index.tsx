import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      className = '',
      style: propStyle,
      ...props
    },
    ref
  ) => {
    // Base styles using CSS variables
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      borderRadius: 'var(--rbc-button-radius, 0.5rem)',
      transition: 'all 200ms',
      outline: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.5 : 1,
      ...propStyle,
    };

    // Variant specific styles using CSS variables
    const variantStyles = {
      primary: {
        backgroundColor: 'var(--rbc-button-primary-bg, var(--rbc-primary))',
        color: 'var(--rbc-button-primary-text, white)',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-primary-hover-bg, var(--rbc-primary-hover))',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-primary-focus-ring, var(--rbc-primary-light))',
        },
      },
      secondary: {
        backgroundColor: 'var(--rbc-button-secondary-bg, var(--rbc-secondary))',
        color: 'var(--rbc-button-secondary-text, var(--rbc-text-primary))',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-secondary-hover-bg, var(--rbc-secondary-hover))',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-secondary-focus-ring, var(--rbc-secondary-light))',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        border: '1px solid var(--rbc-button-outline-border, var(--rbc-border-color))',
        color: 'var(--rbc-button-outline-text, var(--rbc-text-primary))',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-outline-hover-bg, var(--rbc-bg-hover))',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-outline-focus-ring, var(--rbc-border-color))',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--rbc-button-ghost-text, var(--rbc-text-primary))',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-ghost-hover-bg, var(--rbc-bg-hover))',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-ghost-focus-ring, var(--rbc-bg-hover))',
        },
      },
      danger: {
        backgroundColor: 'var(--rbc-button-danger-bg, #DC2626)',
        color: 'var(--rbc-button-danger-text, white)',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-danger-hover-bg, #B91C1C)',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-danger-focus-ring, rgba(220, 38, 38, 0.2))',
        },
      },
      success: {
        backgroundColor: 'var(--rbc-button-success-bg, #059669)',
        color: 'var(--rbc-button-success-text, white)',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-success-hover-bg, #047857)',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-success-focus-ring, rgba(5, 150, 105, 0.2))',
        },
      },
      warning: {
        backgroundColor: 'var(--rbc-button-warning-bg, #F59E0B)',
        color: 'var(--rbc-button-warning-text, white)',
        '&:hover': {
          backgroundColor: 'var(--rbc-button-warning-hover-bg, #D97706)',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px var(--rbc-button-warning-focus-ring, rgba(245, 158, 11, 0.2))',
        },
      },
    };

    // Size specific styles
    const sizeStyles = {
      sm: {
        fontSize: 'var(--rbc-button-sm-font-size, 0.875rem)',
        padding: 'var(--rbc-button-sm-padding, 0.375rem 0.75rem)',
        gap: 'var(--rbc-button-sm-gap, 0.375rem)',
      },
      md: {
        fontSize: 'var(--rbc-button-md-font-size, 0.875rem)',
        padding: 'var(--rbc-button-md-padding, 0.5rem 1rem)',
        gap: 'var(--rbc-button-md-gap, 0.5rem)',
      },
      lg: {
        fontSize: 'var(--rbc-button-lg-font-size, 1rem)',
        padding: 'var(--rbc-button-lg-padding, 0.75rem 1.5rem)',
        gap: 'var(--rbc-button-lg-gap, 0.75rem)',
      },
      icon: {
        padding: 'var(--rbc-button-icon-padding, 0.5rem)',
      },
    };

    const combinedStyle = {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      width: fullWidth ? '100%' : 'auto',
    };

    // Base classes for consistent features
    const baseClasses = 'rbc-transition-colors rbc-duration-200 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-offset-2';

    // Icon rendering
    const renderIcon = () => {
      if (loading) {
        return (
          <Loader2 
            className="rbc-animate-spin" 
            size={size === 'lg' ? 20 : 16}
            style={{ color: 'inherit' }}
          />
        );
      }
      return icon;
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${className}`}
        disabled={disabled || loading}
        style={combinedStyle}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        {size !== 'icon' && children}
        {iconPosition === 'right' && !loading && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;