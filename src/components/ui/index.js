import React from 'react';
import { cn } from '../../utils/cn';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

// Button Component
export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

// Card Component
export const Card = ({ className, children, ...props }) => (
  <div className={cn('card', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('card-header', className)} {...props}>
    {children}
  </div>
);

export const CardBody = ({ className, children, ...props }) => (
  <div className={cn('card-body', className)} {...props}>
    {children}
  </div>
);

// Input Component
export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    className={cn('form-input', className)}
    ref={ref}
    {...props}
  />
));

// Label Component
export const Label = ({ className, children, ...props }) => (
  <label className={cn('form-label', className)} {...props}>
    {children}
  </label>
);

// Badge Component
export const Badge = ({ className, variant = 'info', children, ...props }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  };

  return (
    <span className={cn('badge', variants[variant], className)} {...props}>
      {children}
    </span>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={cn(
          'inline-block w-full bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle',
          sizes[size]
        )}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Alert Component
export const Alert = ({ variant = 'info', title, children, onClose }) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-400',
      titleColor: 'text-green-800',
      textColor: 'text-green-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-red-400',
      titleColor: 'text-red-800',
      textColor: 'text-red-700',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700',
    },
  };

  const config = variants[variant];
  const IconComponent = config.icon;

  return (
    <div className={cn('rounded-lg border p-4', config.bg, config.border)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={cn('h-5 w-5', config.iconColor)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium', config.titleColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', title ? 'mt-2' : '', config.textColor)}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  config.textColor,
                  'hover:bg-opacity-20'
                )}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-primary-600', sizes[size], className)}></div>
  );
};

// Empty State
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    {Icon && (
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <Icon className="h-full w-full" />
      </div>
    )}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    {description && (
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
    )}
    {action}
  </div>
);