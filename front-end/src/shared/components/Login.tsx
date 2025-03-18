import React, { useState } from 'react';
import { LoginAuth } from '../services/api/auth/Login.auth';
import { InputText } from './InputText';
import { Button } from './Button';

interface ILogin {
  handleRegister: () => void;
}
export const Login: React.FC<ILogin> = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    if (email && !emailRegex.test(email)) return setError('Campos invalidos');
    else if (!password || !email) return setError('Campos nao podem estar vazios');
    else {setError(''); return true;}
  };

  const formData = async () => {
    if (handleLogin()) return setError(await LoginAuth({ email, password }));
  };

  return (
    <div className="sm:w-[450px] w-[82vw] sm:px-5 transition-all duration-500 px-2 py-6">
      <div className="text-zinc-500 text-3xl font-semibold flex flex-col items-center">
        ZapDelivery
        <div className="sm:mb-5 mt-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-white shadow-md">
          🍔
        </div>
      </div>
      <div className="text-sm h-2 mt-5 flex justify-center mb-7 text-orange-600 transition-all duration-300">
        {error}
      </div>

      <InputText
        onChange={(e) => {handleLogin(); setEmail(e.target.value);}}
        value={email}
        placeholder='Email'
        iconLeft="✉️"
      />
      <InputText
        onChange={(e) => { handleLogin(); setPassword(e.target.value);}}
        value={password}
        placeholder='Password'
        iconLeft="🔒"
      />

      <Button label="Entrar" onClick={formData} />

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-zinc-300"></div>
        <span className="px-4 text-sm text-zinc-500">ou continue com</span>
        <div className="flex-1 border-t border-zinc-300"></div>
      </div>
      <div className="flex justify-center gap-5">
        {['G', 'f', 'in'].map((icon, i) => (
          <div
            key={i}
            className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 cursor-pointer duration-200 hover:bg-orange-500
             hover:text-white transition-all shadow-sm text-orange-500"
          >
            {' '} {icon}
          </div>
        ))}
      </div>
      <div className="text-center mt-6 text-zinc-500 text-sm">
        Não tem uma conta?{' '}
        <span
          onClick={handleRegister}
          className="text-orange-500 hover:text-orange-700 font-medium cursor-pointer"
        >
        Registre-se
        </span>
      </div>
    </div>
  );
};
