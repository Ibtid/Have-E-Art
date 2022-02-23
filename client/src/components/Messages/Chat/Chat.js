import React from 'react';

import rightArrow from '../../../assets/icons/rightArrow.svg';

import './Chat.css';
import OneChat from './OneChat';

import { Link } from 'react-router-dom';

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat__head'>
        <div className='chat__nameAndActiveStatus'>
          <div className='chat__name'>Lukas Korel</div>
          <div className='chat__activeStatus'></div>
        </div>
        <Link to='/profile/1' className='chat__viewProfileButton'>
          <div className='chat__viewProfileText'>View Profile</div>
          <img src={rightArrow} alt='' />
        </Link>
      </div>
      <div className='chat__scroll'>
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
        <OneChat />
      </div>
      <div className='chat__footer'>
        <input className='chat__input' />
        <div className='chat__button'>Send</div>
      </div>
    </div>
  );
};

export default Chat;
