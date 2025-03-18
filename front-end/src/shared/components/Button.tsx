import React from 'react';

interface Ibutton {
  onClick: () => void;
  label: string;
}
export const Button: React.FC<Ibutton> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="text-center hover:from-orange-500 hover:to-orange-500 w-full py-3 mt-5 mb-4 bg-gradient-to-r
       from-orange-400 to-orange-500 text-white rounded-full cursor-pointer hover:shadow-md transition-all 
       duration-300 font-medium"
    >
      {label}
    </button>
  );
};
