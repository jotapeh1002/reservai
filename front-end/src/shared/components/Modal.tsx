import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 backdrop-blur-xs bg-black/50 z-50 flex justify-center items-center"
    >
      <div
      className={`bg-zinc-200/80 p-6 rounded-2xl w-fill shadow-lg`}>{children}</div>
    </div>
  );
};
