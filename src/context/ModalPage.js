import React, { useState, useEffect } from 'react';
export const ModalPageContext = React.createContext();

export const ModalPageContextProvider = ({ children }) => {
  const [modalPage, setModalPage] = useState('');

  useEffect(() => {
    setModalPage(modalPage);
  }, [modalPage]);

  return (
    <ModalPageContext.Provider value={[modalPage, setModalPage]}>
      {children}
    </ModalPageContext.Provider>
  );

}