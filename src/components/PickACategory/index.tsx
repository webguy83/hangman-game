import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';
import CategoryButton from '../common/CategoryButton';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import { CategoryName } from '../../types';

interface PickACategoryProps {
  goBack: () => void;
  onCategorySelected: (categoryName: CategoryName, selectedWord: string) => void;
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack, onCategorySelected }) => {
  const { selectRandomWord, categories } = useCategorySelection();

  const handleCategorySelected = (categoryName: CategoryName) => {
    const [name, word] = selectRandomWord(categoryName);
    onCategorySelected(name, word);
  };

  return (
    <div className='pick-a-category'>
      <Header goBack={goBack} headerTxt='Pick a Category' />
      <div className='pick-a-category-container'>
        {Object.keys(categories).map((category) => (
          <CategoryButton
            key={category}
            categoryName={category as CategoryName}
            onClick={handleCategorySelected} // Pass this function as a prop to CategoryButton
          />
        ))}
      </div>
    </div>
  );
};

export default PickACategory;
