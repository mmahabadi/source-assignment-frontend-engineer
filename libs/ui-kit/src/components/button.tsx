import { FC } from 'react';
import { cn } from '../utils';
type ButtonProps = {
  variant: 'default' | 'link' | 'primary' | 'danger';
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  onMouseOut?: () => void;
  onMouseOver?: () => void;
};

const Button: FC<ButtonProps> = ({
  variant = 'default',
  className,
  loading,
  disabled,
  children,
  ...props
}) => {
  const variants = {
    link: 'text-blue-500 hover:text-blue-700',
    primary:
      'bg-sky-900 hover:bg-sky-700 hover:text-white text-white rounded-sm',
    default:
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
    danger: 'text-white bg-red-500 hover:bg-red-600',
  };
  const classNames = `py-2 px-5 me-2 mb-2 mr-2 text-sm font-medium focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100 
    ${variants[variant]}
    ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  return (
    <button
      disabled={loading || disabled}
      type="button"
      className={cn(classNames, className)}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
Button.displayName = 'Button';

export { Button };
