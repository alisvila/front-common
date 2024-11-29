import React from 'react';
import { X } from 'lucide-react';

type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'outline';

type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      iconPosition = 'left',
      removable = false,
      onRemove,
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
      borderRadius: 'var(--rbc-badge-radius, 9999px)',
      whiteSpace: 'nowrap' as const,
      transition: 'all 200ms',
      ...propStyle,
    };

    // Variant specific styles using CSS variables
    const variantStyles = {
      default: {
        backgroundColor: 'var(--rbc-badge-default-bg, var(--rbc-bg-secondary, #F3F4F6))',
        color: 'var(--rbc-badge-default-text, var(--rbc-text-primary, #111827))',
        border: '1px solid var(--rbc-badge-default-border, transparent)',
      },
      primary: {
        backgroundColor: 'var(--rbc-badge-primary-bg, var(--rbc-primary, #3B82F6))',
        color: 'var(--rbc-badge-primary-text, white)',
        border: '1px solid var(--rbc-badge-primary-border, transparent)',
      },
      secondary: {
        backgroundColor: 'var(--rbc-badge-secondary-bg, var(--rbc-secondary, #E5E7EB))',
        color: 'var(--rbc-badge-secondary-text, var(--rbc-text-primary, #111827))',
        border: '1px solid var(--rbc-badge-secondary-border, transparent)',
      },
      success: {
        backgroundColor: 'var(--rbc-badge-success-bg, #10B981)',
        color: 'var(--rbc-badge-success-text, white)',
        border: '1px solid var(--rbc-badge-success-border, transparent)',
      },
      warning: {
        backgroundColor: 'var(--rbc-badge-warning-bg, #F59E0B)',
        color: 'var(--rbc-badge-warning-text, white)',
        border: '1px solid var(--rbc-badge-warning-border, transparent)',
      },
      danger: {
        backgroundColor: 'var(--rbc-badge-danger-bg, #EF4444)',
        color: 'var(--rbc-badge-danger-text, white)',
        border: '1px solid var(--rbc-badge-danger-border, transparent)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--rbc-badge-outline-text, var(--rbc-text-primary, #111827))',
        border: '1px solid var(--rbc-badge-outline-border, var(--rbc-border-color, #E5E7EB))',
      },
    };

    // Size specific styles
    const sizeStyles = {
      sm: {
        fontSize: 'var(--rbc-badge-sm-font-size, 0.75rem)',
        padding: 'var(--rbc-badge-sm-padding, 0.125rem 0.5rem)',
        gap: 'var(--rbc-badge-sm-gap, 0.25rem)',
      },
      md: {
        fontSize: 'var(--rbc-badge-md-font-size, 0.875rem)',
        padding: 'var(--rbc-badge-md-padding, 0.25rem 0.75rem)',
        gap: 'var(--rbc-badge-md-gap, 0.375rem)',
      },
      lg: {
        fontSize: 'var(--rbc-badge-lg-font-size, 1rem)',
        padding: 'var(--rbc-badge-lg-padding, 0.375rem 1rem)',
        gap: 'var(--rbc-badge-lg-gap, 0.5rem)',
      },
    };

    const combinedStyle = {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    // Icon sizes based on badge size
    const getIconSize = () => {
      switch (size) {
        case 'sm':
          return 14;
        case 'lg':
          return 18;
        default:
          return 16;
      }
    };

    const iconSize = getIconSize();

    return (
      <div
        ref={ref}
        className={`rbc-badge ${className}`}
        style={combinedStyle}
        {...props}
      >
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
        {removable && (
          <button
            onClick={onRemove}
            className="rbc-flex rbc-items-center rbc-justify-center hover:rbc-opacity-80"
            style={{
              marginLeft: sizeStyles[size].gap,
              padding: '2px',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            <X size={iconSize} />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;