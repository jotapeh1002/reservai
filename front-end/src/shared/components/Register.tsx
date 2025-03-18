import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { RegisterAuth } from '../services/api/auth/Register.auth';
import { InputText } from './InputText';
import { Button } from './Button';

interface IRegister {
  handleLogin: () => void;
}

export const Register: React.FC<IRegister> = ({ handleLogin }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleregister = ()=> {
    if (!password || !email || !name || !phone) setError('Campos nao podem estar vazios');
    else if (!emailRegex.test(email)) setError('Campos invalidos');
    else if (password.length < 8) setError('Senha muito curta"');
    else if (phone.length < 15) setError('Telefone invalido');
    else {setError(''); return true;} 
  };
  const formData = async () => {
    if (handleregister()) return setError(await RegisterAuth({ name, email, password, phone }));
    else alert('usuario criado')
  };

  const formatPhoneNumber = (value: string) =>
    value.replace(/\D/g, '').slice(0, 11).replace(/(\d{2})(\d{1,5})(\d{4})/, '($1) $2-$3');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ( e.key === 'Backspace' && /[^0-9]/.test(phone.charAt(e.currentTarget.selectionStart! - 1))) {
      e.preventDefault();
      setPhone(formatPhoneNumber(phone.slice(0, e.currentTarget.selectionStart! - 1) + phone.slice(e.currentTarget.selectionStart!)));
    }
  };

  return (
    <div className="sm:w-[450px] w-[82vw] sm:px-5 transition-all duration-500 px-2 py-6">
      <div className="text-3xl text-center mb-12">
        <div className="text-zinc-500 font-semibold flex flex-col items-center">
          Registre-se
          <div className="relative">
            <div className="sm:mb-3 mt-10 text-4xl rounded-full bg-gradient-to-br from-orange-400 to-orange-500 p-8 text-white shadow-md">
              🍔
            </div>
            <div className="absolute bottom-0 right-0 mb-2 -ml-2 rounded-full bg-zinc-100 p-2 shadow-md border-2
             border-orange-400 cursor-pointer hover:bg-orange-100 transition-all duration-300">
              <FaPencilAlt className="text-orange-500" size={16} />
            </div>
          </div>
        </div>
        <div className="text-sm h-2 mt-4 -mb-2 flex justify-center  text-orange-600 transition-all duration-300">
          {error}
        </div>
      </div>

      <InputText
        onChange={(e) => { handleregister(); setName(e.target.value);}}
        value={name}
        placeholder='Nome'
        maxLength={20}
        iconLeft="👤"
      />
      <InputText
        onChange={(e) => {handleregister(); setEmail(e.target.value);}}
        value={email}
        placeholder='Email'
        iconLeft="✉️"
      />
      <InputText
        onChange={(e) => { handleregister(); setPassword(e.target.value);}}
        value={password}
        placeholder='Senha'
        iconLeft="🔒"
      />
      <InputText
        onChange={(e) => { setPhone(formatPhoneNumber(e.target.value));}}
        value={phone}
        onKeyDown={handleKeyDown}
        placeholder='Telefone'
        maxLength={15}
        iconLeft="📱"
      />

      <Button label="Registrar" onClick={formData} />

      <div className="text-center mt-5 text-zinc-500 text-sm">
        <span
          onClick={handleLogin}
          className="text-orange-500 text-lg hover:text-orange-700 font-medium cursor-pointer"
        >
          Voltar
        </span>
      </div>
    </div>
  );
};
