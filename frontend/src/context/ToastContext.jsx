import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import './ToastContext.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setToast({ visible: true, message });
    
    timerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className="toast-notification flex items-center gap-1">
          <CheckCircle size={18} />
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
