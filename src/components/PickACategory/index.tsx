import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';
import CategoryButton from '../common/CategoryButton';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import { CategoryName } from '../../types';
import { GameState } from '../../constants/GameState';

interface PickACategoryProps {
  goBack: () => void;
  setCategoryName: (categoryName: CategoryName) => void;
  setGameState: (gameState: GameState) => void
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack, setCategoryName, setGameState }) => {
  const { categories } = useCategorySelection();

  const handleCategorySelected = (categoryName: CategoryName) => {
    setCategoryName(categoryName);
    setGameState(GameState.MainGame);
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
