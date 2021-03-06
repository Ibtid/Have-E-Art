import React from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import views from '../../../assets/icons/views.svg';
import './ForSale.css';
import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';

const ForSale = () => {
  const imageArray = [image, image2, image3, image4];
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();

  let index = Math.floor(Math.random() * 3.9);

  return (
    <div
      to='/product/1'
      className='boughtCard leftToRight'
      onClick={() => {
        setContextStore({ ...contextStore, owner: true });
        navigator('/product/1');
      }}>
      <div className='bought__imageContainer'>
        <img className='bought__image' src={imageArray[index]} alt='art' />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>Color Brust</div>
        </div>
        <div className='productShowcaseCard__rowTwo'>
          <div className='productShowcaseCard__dateAndViewsContainer'>
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
          <div className='productShowcaseCard__pricePerCopy'>
            {index / 2 === 0 ? '$500/copy' : '$500'}
          </div>
        </div>
        <div className='bought__rowThree'>
          <div className='bought__created'>
            <span>Created by :</span>
            <span className='productShowcaseCard__name'>Don Carlo</span>
          </div>
          <div className='bought__type'>Copies Sold: 29/100</div>
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

export default ForSale;
