import { useState } from 'react';
import data from '../data/data.json';
import { Categories } from '../interfaces';
import { CategoryName } from '../types';

interface CategoryData {
  categories: Categories;
}

export const useCategorySelection = () => {
  const categoryData: CategoryData = data;
  const [categories, setCategories] = useState<Categories>(categoryData.categories);

  const selectRandomWord = (categoryName: keyof Categories): [CategoryName, string] => {
    // Filter out already selected words
    const availableWords = categories[categoryName].filter((word) => !word.selected);

    // If all words have been selected, reset the category and select again
    if (availableWords.length === 0) {
      const resetWords = categories[categoryName].map((word) => ({ ...word, selected: false }));
      setCategories((prev) => ({ ...prev, [categoryName]: resetWords }));
      return selectRandomWord(categoryName);
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex].name;

    // Mark the word as selected
    const updatedWords = categories[categoryName].map((word) => (word.name === selectedWord ? { ...word, selected: true } : word));
    setCategories((prev) => ({ ...prev, [categoryName]: updatedWords }));

    return [categoryName, selectedWord];
  };

  return { selectRandomWord, categories };
};
