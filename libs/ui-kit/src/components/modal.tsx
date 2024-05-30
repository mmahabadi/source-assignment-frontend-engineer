import { FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './icons/CloseIcon';
type propTypes = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};
export const Modal: FC<propTypes> = ({ children, onClose, title }) => {
  const modalRootEl = document.getElementById('modal');
  if (!modalRootEl) {
    console.error('Modal root element not found');
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white shadow-lg z-10 w-[500px]">
        <div className="flex justify-between p-4 border-b">
          <h4 className="font-semibold leading-none tracking-tight">{title}</h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRootEl as HTMLElement
  );
};
