import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';

interface PickACategoryProps {
  goBack: () => void;
  onCategorySelected: () => void;
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack }) => {
  return (
    <div className='pick-a-category'>
      <Header goBack={goBack} headerTxt='Pick a Category' />
      <div className='pick-a-category-container'>
        <div className='item'>MOVIES</div>
        <div className='item'>TV SHOWS</div>
        <div className='item'>COUNTRIES</div>
        <div className='item'>CAPITAL CITIES</div>
        <div className='item'>ANIMALS</div>
        <div className='item'>SPORTS</div>
      </div>
    </div>
  );
};

export default PickACategory;
