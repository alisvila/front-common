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
      ...props
    },
    ref
  ) => {
    // Base classes always applied
    const baseClasses = 'rbc-inline-flex rbc-items-center rbc-justify-center rbc-font-medium rbc-rounded-lg rbc-transition-colors rbc-duration-200 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-offset-2 disabled:rbc-opacity-50 disabled:rbc-cursor-not-allowed';

    // Variant specific classes
    const variantClasses = {
      primary: 'rbc-bg-blue-600 rbc-text-white hover:rbc-bg-blue-700 focus:rbc-ring-blue-500',
      secondary: 'rbc-bg-gray-100 rbc-text-gray-700 hover:rbc-bg-gray-200 focus:rbc-ring-gray-500',
      outline: 'rbc-border rbc-border-gray-300 rbc-text-gray-700 hover:rbc-bg-gray-50 focus:rbc-ring-gray-500',
      ghost: 'rbc-text-gray-700 hover:rbc-bg-gray-100 focus:rbc-ring-gray-500',
      danger: 'rbc-bg-red-600 rbc-text-white hover:rbc-bg-red-700 focus:rbc-ring-red-500',
      success: 'rbc-bg-green-600 rbc-text-white hover:rbc-bg-green-700 focus:rbc-ring-green-500',
      warning: 'rbc-bg-yellow-500 rbc-text-white hover:rbc-bg-yellow-600 focus:rbc-ring-yellow-500'
    };

    // Size specific classes
    const sizeClasses = {
      sm: 'rbc-text-sm rbc-px-3 rbc-py-1.5 rbc-gap-1.5',
      md: 'rbc-text-sm rbc-px-4 rbc-py-2 rbc-gap-2',
      lg: 'rbc-text-base rbc-px-6 rbc-py-3 rbc-gap-3',
      icon: 'rbc-p-2'
    };

    // Width classes
    const widthClasses = fullWidth ? 'rbc-w-full' : '';

    // Combine all classes
    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClasses,
      className
    ].join(' ');

    // Icon rendering
    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="rbc-animate-spin" size={size === 'lg' ? 20 : 16} />;
      }
      return icon;
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
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