import data from '../data/data.json';

interface Category {
  name: string;
  selected: boolean;
}

interface Categories {
  Movies: Category[];
  'TV Shows': Category[];
  Countries: Category[];
  'Capital Cities': Category[];
  Animals: Category[];
  Sports: Category[];
}

interface CategoryData {
  categories: Categories;
}

export const useCategorySelection = () => {
  const categoryData: CategoryData = data;
  const selectRandomWord = (categoryName: string): [string, string] => {
    const words = categoryData.categories[categoryName as keyof Categories];
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex].name;
    return [categoryName, selectedWord];
  };

  return { selectRandomWord };
};
