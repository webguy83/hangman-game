import { useCallback, useState } from 'react';
import data from '../data/data.json';
import { Categories } from '../interfaces';
import { CategoryName } from '../types';

interface CategoryData {
  categories: Categories;
}

export const useCategorySelection = () => {
  const categoryData: CategoryData = data;
  const [categories, setCategories] = useState<Categories>(categoryData.categories);

  const selectRandomWord = useCallback((categoryName: keyof Categories): [CategoryName, string] => {
    let availableWords = categories[categoryName].filter(word => !word.selected);

    // Direct approach to handle if all words are selected
    if (availableWords.length === 0) {
      // Reset all words in the category to not selected
      const resetWords = categories[categoryName].map(word => ({ ...word, selected: false }));
      setCategories(prev => ({ ...prev, [categoryName]: resetWords }));
      
      // Immediately update availableWords with reset words for selection
      availableWords = resetWords;
    }

    // Now, select a random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex].name;

    // Mark the word as selected and update the state
    const updatedWords = categories[categoryName].map(word => word.name === selectedWord ? { ...word, selected: true } : word);
    setCategories(prev => ({ ...prev, [categoryName]: updatedWords }));

    return [categoryName, selectedWord];
  }, [categories]);

  return { selectRandomWord, categories };
};

