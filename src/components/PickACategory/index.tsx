import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';
import data from '../../data/data.json'; // Adjust the path as necessary
import CategoryButton from '../common/CategoryButton';

interface PickACategoryProps {
  goBack: () => void;
  onCategorySelected: (categoryName: string, selectedWord: string) => void; // Adjusted to include parameters
}

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

interface Data {
  categories: Categories;
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack, onCategorySelected }) => {
  const typedData: Data = data;

  // Define the handleCategorySelected function here
  const handleCategorySelected = (categoryName: string) => {
    if (categoryName in typedData.categories) {
      const words = typedData.categories[categoryName as keyof Categories];
      const randomIndex = Math.floor(Math.random() * words.length);
      const selectedWord = words[randomIndex].name;
      onCategorySelected(categoryName, selectedWord); // Ensure this function is adjusted to accept parameters
    } else {
      console.error('Invalid category name:', categoryName);
    }
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
