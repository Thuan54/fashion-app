import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2">
        <span className="font-bold text-sm">Success</span>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;