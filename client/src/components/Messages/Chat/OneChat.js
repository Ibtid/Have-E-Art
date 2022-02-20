import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './OneChat.css';

const OneChat = () => {
  return (
    <div className='oneChat'>
      <div className='oneChat__left'>
        <img className='oneChat__avatar' src={avatar} />
      </div>
      <div className='oneChat__middle'>
        <div className='oneChat__sendersName'>Lukas Korel</div>
        <div className='oneChat__chatCollection'>
          <div className='oneChat__singleText'>Hi</div>
          <div className='oneChat__singleText'>I need this Art</div>
          <div className='oneChat__singleText'>
            But I can give you a 10% discount on my next art.
          </div>
        </div>
      </div>
      <div className='oneChat__right'>
        <div className='oneChat__date'>2:21 AM</div>
      </div>
    </div>
  );
};

export default OneChat;
