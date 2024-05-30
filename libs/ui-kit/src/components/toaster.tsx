import { cn } from '../utils';
import { FC } from 'react';
import { ToasterMessage } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import { SuccessIcon } from './icons/SuccessIcon';
import { WarningIcon } from './icons/WarningIcon';
import styles from './toaster.module.css';

type propTypes = Omit<ToasterMessage, 'id'> & {
  onClose: () => void;
};
const Toaster: FC<propTypes> = ({ message, type, onClose }) => {
  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
  };
  const colors = {
    success: 'text-green-500 bg-green-100',
    error: 'bg-red-500 text-red-100',
    warning: 'bg-orange-500 text-orange-100',
  };

  return (
    <div className={styles.toaster} role="alert">
      <div className={cn(styles.icon, colors[type])}>{icons[type]}</div>
      <div className={styles.text}>{message}</div>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

export { Toaster };
