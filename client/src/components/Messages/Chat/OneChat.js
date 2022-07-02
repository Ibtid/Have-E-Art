import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './OneChat.css';

const OneChat = ({message}) => {
  return (
    <div className='oneChat'>
      <div className='oneChat__left'>
        <img className='oneChat__avatar' src={message.sender.profileImage ? message.sender.profileImage : avatar} />
      </div>
      <div className='oneChat__middle'>
        <div className='oneChat__sendersName'>{`${message.sender.firstName} ${message.sender.lastName}`}</div>
        <div className='oneChat__chatCollection'>
          
          <div className='oneChat__singleText'>
            {message.text}
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
