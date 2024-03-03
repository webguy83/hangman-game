// CategoryButton.tsx

import React from 'react';
import './CategoryButton.scss';
import { CategoryName } from '../../../types';

interface CategoryButtonProps {
  categoryName: CategoryName;
  onClick: (categoryName: CategoryName) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ categoryName, onClick }) => {
  return (
    <button className='category-button' onClick={() => onClick(categoryName)} type='button' aria-label={`Select category ${categoryName}`} tabIndex={0}>
      {categoryName.toUpperCase()}
    </button>
  );
};

export default CategoryButton;
