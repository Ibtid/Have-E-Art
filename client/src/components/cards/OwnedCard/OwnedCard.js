import React from 'react';

import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';
import getDate from '../../../utility/getDate';

const OwnedCard = ({ eart }) => {
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();
  return (
    <div
      to='/product/1'
      className='boughtCard fadeIn'
      onClick={() => {
        setContextStore({ ...contextStore, owner: true });

        navigator(`/product/${eart._id}`);
      }}>
      <div className='bought__imageContainer'>
        <img className='bought__image' src={eart.imgUrl} alt='art' />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>{eart.title}</div>
        </div>
        <div className='bought__rowTwo'>
          Uploaded at {getDate(eart.uploadDate)}
        </div>
        <div className='bought__rowThree'>
          <div className='bought__created'>
            <span>Created by :</span>
            <span className='productShowcaseCard__name'>
              {eart.creator.firstName} {eart.creator.lastName}
            </span>
          </div>
          <div className='bought__type'>Type: Original</div>
          <div className='bought__owned'>
            <span>Owned by:</span>
            <span className='productShowcaseCard__name'>
              {eart.owner.firstName} {eart.owner.lastName}
            </span>
          </div>
          <div className='bought__format'>Format: {eart.format}</div>
        </div>
      </div>
    </div>
  );
};

export default OwnedCard;
