import React from 'react';

import './OneChat.css';

const SendingChat = ({ message }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='oneChat sendingChat__opacity'>
      <div className='oneChat__left'>
        <img className='oneChat__avatar' src={user.profileImage} />
      </div>
      <div className='oneChat__middle'>
        <div className='oneChat__sendersName'>{`${user.firstName} ${user.lastName}`}</div>
        <div className='oneChat__chatCollection'>
          <div className='oneChat__singleText'>{message}</div>
        </div>
      </div>
      <div className='oneChat__right'>
        <div className='oneChat__date'>Sending...</div>
      </div>
    </div>
  );
};

export default SendingChat;
