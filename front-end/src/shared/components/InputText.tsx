import React from "react";

interface IInputText {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  iconLeft?: string;
  iconRigth?: string;
  maxLength?:number
  placeholder?:string
  onKeyDown?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<IInputText> = ({
  value,
  onChange,
  type = 'text',
  iconLeft,
  iconRigth,
  maxLength,
  placeholder,
  onKeyDown
}) => {
  return (
    <div className="hover:border-orange-500 border-2 border-transparent bg-gray-100 w-full rounded-full px-4 py-3 mb-4 flex items-center shadow-sm">
      <span>{iconLeft && iconLeft}</span>
      <input
        onChange={onChange}
        value={value}
        className="w-full ml-3 bg-transparent focus:outline-none focus:ring-0 text-zinc-700"
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
      />
      <span>{iconRigth && iconRigth}</span>
    </div>
  );
};
