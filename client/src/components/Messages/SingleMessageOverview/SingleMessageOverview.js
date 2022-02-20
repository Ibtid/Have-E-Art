import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './SingleMessageOverview.css';

const SingleMessageOverview = () => {
  return (
    <div className='singleMessageOverview'>
      <div className='singleMessageOverview__imageContainer'>
        <img src={avatar} className='singleMessageOverview__image' />
      </div>
      <div className='singleMessageOverview__text'>
        <div className='singleMessageOverview__nameAndActive'>
          <div className='singleMessageOverview__name'>Lukas Korel</div>
          <div className='singleMessageOverview__active'></div>
        </div>
        <div className='singleMessageOverview__message'>
          Hi, I need to get this job...
        </div>
      </div>
    </div>
  );
};

export default SingleMessageOverview;
