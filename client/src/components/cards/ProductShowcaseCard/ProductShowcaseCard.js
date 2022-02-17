import React from 'react';

import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import './ProductShowcaseCard.css';

const ProductShowcaseCard = () => {
  return (
    <div className='productShowcaseCard'>
      <div className='productShowcaseCard__imageContainer'>
        <img className='productShowcaseCard__image' src={image2} alt='image' />
      </div>
      <div className='productShowcaseCard__description'>
        <div className='productShowcaseCard__rowOne'>
          <div className='productShowcaseCard__title'>Color Brust</div>
          <div className='productShowcaseCard__price'>$ 10,000</div>
        </div>
        <div className='productShowcaseCard__rowTwo'>
          <div className='productShowcaseCard__date'>16th February, 2022</div>
          <div className='productShowcaseCard__views'>198,222</div>
        </div>
        <div className='productShowcaseCard__rowThree'>
          <div className='productShowcaseCard__people'>
            <div className='productShowcaseCard__created'>
              <span>Created by</span>
              <span>Don Carlo</span>
            </div>
            <div className='productShowcaseCard__owned'>
              <span>Owned by</span>
              <span>Don Carlo</span>
            </div>
          </div>
          <div className='productShowcaseCard__button'>Buy Now</div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseCard;
