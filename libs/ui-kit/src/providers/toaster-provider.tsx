import React, { createContext, useCallback, useContext, useState } from 'react';
import { Toaster } from '../components/toaster';
import { ToasterMessage, ToasterType } from '../types';

const ToasterContext = createContext({
  addToaster: (message: string, type: ToasterType): void => {
    // Default implementation
  },
});

export const ToasterProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [toasters, setToasters] = useState<ToasterMessage[]>([]);

  const addToaster = useCallback((message: string, type: ToasterType): void => {
    const id = Date.now();
    setToasters((prevToasters) => [...prevToasters, { id, message, type }]);
    setTimeout(() => {
      removeToaster(id);
    }, 5000);
  }, []);

  const removeToaster = (id: number) => {
    setToasters((prevToasters) =>
      prevToasters.filter((toaster) => toaster.id !== id)
    );
  };

  return (
    <ToasterContext.Provider value={{ addToaster }}>
      {children}
      <div className="fixed z-[60] right-5 top-10">
        {toasters.map((toaster: ToasterMessage) => (
          <Toaster
            key={toaster.type + toaster.id}
            message={toaster.message}
            type={toaster.type}
            onClose={() => removeToaster(toaster.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  return useContext(ToasterContext);
};
