import React from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import './BoughtCard.css';

const BoughtCard = () => {
  const imageArray = [image, image2, image3, image4];
  return (
    <div className='boughtCard'>
      <div className='bought__imageContainer'>
        <img
          className='bought__image'
          src={imageArray[Math.floor(Math.random() * 3.9)]}
          alt='art'
        />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>Color Brust</div>
        </div>
        <div className='bought__rowTwo'>Bought at 16th February, 2022</div>
        <div className='bought__rowThree'>
          <div className='bought__created'>
            <span>Created by :</span>
            <span className='productShowcaseCard__name'>Don Carlo</span>
          </div>
          <div className='bought__type'>Type: Original</div>
          <div className='bought__owned'>
            <span>Owned by:</span>
            <span className='productShowcaseCard__name'>Don Carlo</span>
          </div>
          <div className='bought__format'>Format: pdf</div>
        </div>
      </div>
    </div>
  );
};

export default BoughtCard;
