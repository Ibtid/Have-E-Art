import React from 'react';

import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import favouriteOutline from '../../../assets/icons/favouritesOutline.svg';
import shareOutline from '../../../assets/icons/shareIcon.svg';
import views from '../../../assets/icons/views.svg';
import './ProductShowcaseCard.css';

const ProductShowcaseCard = () => {
  const imageArray = [image, image2, image3, image4];
  return (
    <div className='productShowcaseCard'>
      <div className='productShowcaseCard__imageContainer'>
        <img
          className='productShowcaseCard__image'
          src={imageArray[Math.floor(Math.random() * 3.9)]}
          alt='art'
        />
        <div className='productShowcaseCard__imageDetails'></div>
        <img
          className='productShowcaseCard__favouriteIcon'
          src={favouriteOutline}
          alt='favourite'
        />
        <img
          className='productShowcaseCard__shareIcon'
          src={shareOutline}
          alt='favourite'
        />
      </div>
      <div className='productShowcaseCard__description'>
        <div className='productShowcaseCard__rowOne'>
          <div className='productShowcaseCard__title'>Color Brust</div>
          <div className='productShowcaseCard__price'>$ 10,000</div>
        </div>
        <div className='productShowcaseCard__rowTwo'>
          <div className='productShowcaseCard__date'>16th February, 2022</div>
          <div className='productShowcaseCard__views'>
            <img
              src={views}
              className='productShowcaseCard__viewsicon'
              alt='views'
            />
            <div className='productShowcaseCard__viewsNumber'> 198,222</div>
          </div>
        </div>
        <div className='productShowcaseCard__rowThree'>
          <div className='productShowcaseCard__people'>
            <div className='productShowcaseCard__created'>
              <span>Created by :</span>
              <span className='productShowcaseCard__name'>Don Carlo</span>
            </div>
            <div className='productShowcaseCard__owned'>
              <span>Owned by:</span>
              <span className='productShowcaseCard__name'>Don Carlo</span>
            </div>
          </div>
          <div className='productShowcaseCard__button'>Buy Now</div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseCard;
