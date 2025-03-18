// import { useNavigate } from "react-router-dom";
import { Modal } from './Modal';
import { Login } from './Login';
import { Register } from './Register';
import React, { useState } from 'react';

interface IModalLogin {
  onClose: () => void;
  open: boolean;
}
export const ModalLogin: React.FC<IModalLogin> = ({
  onClose,
  open = false,
}) => {
  const [handleLogin, setHandleLogin] = useState(false);
  return (
    <Modal onClose={onClose} isOpen={open}>
      {!handleLogin ? (
        <Login handleRegister={() => setHandleLogin(true)} />
      ) : (
        <Register handleLogin={() => setHandleLogin(false)} />
      )}
    </Modal>
  );
};
