import React from 'react';

import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';
import getDate from '../../../utility/getDate';

const CopyCard = ({ copyEart }) => {
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();
  return (
    <div
      to='/product/1'
      className='boughtCard'
      onClick={() => {
        setContextStore({ ...contextStore, owner: true });

        navigator(`/product/copy/${copyEart._id}`);
      }}>
      <div className='bought__imageContainer'>
        <img className='bought__image' src={copyEart.edition.eart.imgUrl} alt='art' />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>{copyEart.edition.eart.title} - Copy</div>
        </div>
        <div className='bought__rowTwo'>
          Uploaded at {getDate(copyEart.edition.eart.uploadDate)}
        </div>
        <div className='bought__rowThree'>
          <div className='bought__created'>
            <span>Created by :</span>
            <span className='productShowcaseCard__name'>
              {copyEart.edition.eart.creator.firstName} {copyEart.edition.eart.creator.lastName}
            </span>
          </div>
          <div className='bought__type'>Type: Copy</div>
          <div className='bought__owned'>
            <span>Owned by:</span>
            <span className='productShowcaseCard__name'>
              {copyEart.owner.firstName} {copyEart.owner.lastName}
            </span>
          </div>
          <div className='bought__format'>Format: {copyEart.edition.eart.format}</div>
        </div>
      </div>
    </div>
  );
};

export default CopyCard;
