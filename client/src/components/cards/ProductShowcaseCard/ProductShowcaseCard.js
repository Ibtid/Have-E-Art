import React, { useContext } from 'react';

import favouriteOutline from '../../../assets/icons/favouritesOutline.svg';
import favouriteFilled from '../../../assets/icons/favoritesFilled.svg';
import shareOutline from '../../../assets/icons/shareIcon.svg';
import views from '../../../assets/icons/views.svg';
import './ProductShowcaseCard.css';

import { useNavigate } from 'react-router-dom';
import getDate from '../../../utility/getDate';
import { AppContext } from '../../../hooks/AppContext';

const ProductShowcaseCard = ({ eart }) => {
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();

  return (
    <div
      to='/product/1'
      className='productShowcaseCard leftToRight'
      onClick={() => {
        navigator(`/product/${eart._id}`);
      }}>
      <div className='productShowcaseCard__imageContainer'>
        <img
          className='productShowcaseCard__image'
          src={eart.imgUrl}
          alt='art'
        />
        <div className='productShowcaseCard__imageDetails'></div>
        <img
          className='productShowcaseCard__favouriteIcon'
          src={
            contextStore.user && eart.followers.includes(contextStore.user._id)
              ? favouriteFilled
              : favouriteOutline
          }
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
          <div className='productShowcaseCard__title'>{eart.title}</div>
          <div className='productShowcaseCard__price'>$ {eart.price}</div>
        </div>
        <div className='productShowcaseCard__rowTwo'>
          <div className='productShowcaseCard__dateAndViewsContainer'>
            <div className='productShowcaseCard__date'>
              {getDate(eart.uploadDate)}
            </div>
            <div className='productShowcaseCard__views'>
              <img
                src={views}
                className='productShowcaseCard__viewsicon'
                alt='views'
              />
              <div className='productShowcaseCard__viewsNumber'> 198,222</div>
            </div>
          </div>
        </div>
        <div className='productShowcaseCard__rowThree'>
          <div className='productShowcaseCard__people'>
            <div className='productShowcaseCard__created'>
              <span>Created by :</span>
              <span className='productShowcaseCard__name'>
                {eart.creator.firstName} {eart.creator.lastName}
              </span>
            </div>
            <div className='productShowcaseCard__owned'>
              <span>Owned by:</span>
              <span className='productShowcaseCard__name'>
                {eart.owner.firstName} {eart.owner.lastName}
              </span>
            </div>
          </div>
          <div className='productShowcaseCard__button'>View E-art</div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseCard;
