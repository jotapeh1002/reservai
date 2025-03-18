import { CategorySmall } from './CategorySmall';

const category = {
  '🔥': 'Populares',
  '🍕': 'Pizzarias',
  '🍔': 'Hamburguers',
  '🍗': 'Frango',
  '🥗': 'Saudável',
  '🍣': 'Japonesa',
  '🥪': 'Lanches',
  '🍦': 'Sobremesas',
  '☕': 'Cafeterias',
};

export const Feed = () => {
  const handleCategorySelect = (name: string) => {
    console.log(name);
  };

  return (
    <CategorySmall
      categoryObj={category}
      defaultSelect="Populares"
      handleCategorySelect={handleCategorySelect}
    />
  );
};