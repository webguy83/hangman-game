import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';
import data from '../../data/data.json'; // Adjust the path as necessary
import CategoryButton from '../common/CategoryButton';
import { useCategorySelection } from '../../hooks/useCategorySelection';

interface PickACategoryProps {
  goBack: () => void;
  onCategorySelected: (categoryName: string, selectedWord: string) => void;
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack, onCategorySelected }) => {
  const { selectRandomWord } = useCategorySelection();

  const handleCategorySelected = (categoryName: string) => {
    const [name, word] = selectRandomWord(categoryName);
    onCategorySelected(name, word);
  };

  return (
    <div className='pick-a-category'>
      <Header goBack={goBack} headerTxt='Pick a Category' />
      <div className='pick-a-category-container'>
        {Object.keys(data.categories).map((category) => (
          <CategoryButton
            key={category}
            categoryName={category}
            onClick={handleCategorySelected} // Pass this function as a prop to CategoryButton
          />
        ))}
      </div>
    </div>
  );
};

export default PickACategory;
