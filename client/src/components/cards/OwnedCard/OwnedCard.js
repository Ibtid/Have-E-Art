import React from 'react';

import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';

const OwnedCard = ({ eart }) => {
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();
  return (
    <div
      to='/product/1'
      className='boughtCard'
      onClick={() => {
        setContextStore({ ...contextStore, owner: true, eart });

        navigator('/product/1');
      }}>
      <div className='bought__imageContainer'>
        <img className='bought__image' src={eart.imgUrl} alt='art' />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>{eart.title}</div>
        </div>
        <div className='bought__rowTwo'>
          uploaded at {new Date(eart.uploadDate).getDate()}th{' '}
          {new Date(eart.uploadDate).toLocaleString('default', {
            month: 'long',
          })}
          , {new Date(eart.uploadDate).getFullYear()}
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
