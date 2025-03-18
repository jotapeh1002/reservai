import { FaShop, FaUser } from 'react-icons/fa6';
import { IoIosNotifications, IoIosSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { ModalLogin } from './ModalLogin';
import { useState } from 'react';

export const NavBar = () => {
  const navigate = useNavigate();
  const [open,setIsOpen] = useState(false)

  const verifyToken = () => {
    const value = localStorage.getItem('Token') ? true : false;
    setIsOpen(e=>!e)
    return value
  };

  return (
    <div className="w-full sm:px-8 px-5 lg:px-10 xl:px-24 pt-5 md:py-2 md:px20 bg-white/70 h-auto lg:h-[78px] shadow-zinc-300 shadow-lg flex flex-wrap items-center justify-between">
      <Link className="text-[28px] font-bold text-orange-400 order-1" to="/">
        ZapDelivery
      </Link>
      <div className="flex justify-center w-full md:w-1/2 md:px-6 order-3 mx-auto">
        <div
          className="flex items-center gap-2 w-full lg:w-96 border-2 border-zinc-200/20 rounded-full px-3 py-2 duration-200 transition-all
         hover:border-orange-400 bg-neutral-200/60 focus-within:border-orange-400 my-5 lg:my-0"
        >
          <IoIosSearch size={22} className="text-orange-400" />
          <input
            type="text"
            className="w-full focus:outline-none focus:ring-0 text-zinc-600 placeholder:text-stone-400"
            placeholder="Busque por pratos, restaurantes..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4 order-2 md:order-3">
        <div
          onClick={() => verifyToken() && navigate('/0')}
          className="flex items-center gap-2 px-3 py-3 lg:px-4 lg:py-2 border-2 rounded-full cursor-pointer text-orange-400
         hover:bg-orange-500/80 hover:text-white border-orange-300 hover:border-orange-400 transition-all duration-300"
        >
          <FaShop size={18} />
          <span className="hidden lg:block">Meu Negócio</span>
        </div>
        <div
          onClick={() => verifyToken() && navigate('/0')}
          className="rounded-full p-2.5 cursor-pointer duration-200 text-orange-400 shadow-sm hover:bg-orange-500/80 hover:text-white transition-all"
        >
          <IoIosNotifications size={23} />
        </div>
        <div
          onClick={() => verifyToken() && navigate('/0')}
          className="rounded-full p-3 cursor-pointer duration-200 hover:bg-orange-500/80 text-orange-400 shadow-sm hover:text-white transition-all"
        >
          <FaUser size={17} />
        </div>
      </div>
      <ModalLogin onClose={()=>setIsOpen(e=>!e)} open={open} />
    </div>
  );
};
