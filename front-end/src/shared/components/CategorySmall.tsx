/* eslint-disable react/prop-types */
import { useState } from 'react';

interface ICategorySmall {
  categoryObj: {
    [key: string]: string;
  };
  defaultSelect?: string;
  moreButton?: boolean;
  handleCategorySelect: (name: string) => void;
  moreAction?: () => void;
}

export const CategorySmall: React.FC<ICategorySmall> = ({
  categoryObj,
  handleCategorySelect,
  defaultSelect = '',
  moreButton = true,
  moreAction
}) => {
  const [categorySelect, setCategorySelect] = useState<string>(defaultSelect);

  return (
    <div className="md:w-[78%] lg:w-[60%] w-full md:mt-4 flex gap-3 px-4 py-5 mx-5 md:gap-8 overflow-x-auto">
      {Object.entries(categoryObj).map(([emoji, name]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div
            onClick={() => {
              setCategorySelect(name);
              handleCategorySelect(name);
            }}
            className={`text-sm flex items-center gap-2 px-4 py-1 rounded-full shadow-xs cursor-pointer ${
              categorySelect === name
                ? 'bg-orange-400/90 text-white'
                : 'bg-white/80 text-zinc-500 hover:border-orange-400/70 border-2 border-transparent'
            }`}
          >
            <span className="text-[21px]">{emoji}</span>
            <span className="text-[14px]">{name}</span>
          </div>
        </div>
      ))}
      {moreButton && (
        <button
          onClick={moreAction}
          className="text-sm rounded-full shadow-xs cursor-pointer bg-white/80 text-zinc-500 hover:border-orange-400/70 
          border-2 border-transparent px-4 flex-shrink-0 whitespace-nowrap -ml-5"
        >
          ›
        </button>
      )}
    </div>
  );
};
