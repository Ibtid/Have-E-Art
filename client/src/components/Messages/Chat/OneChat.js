import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './OneChat.css';

const OneChat = ({ message }) => {
  const formatDate = (year, month, day, minutes, hours) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let compDate = new Date(year, month, day);
    let diff = today.getTime() - compDate.getTime();
    if (compDate.getTime() == today.getTime()) {
      return `Today at ${hours}:${minutes}`;
    } else if (diff <= 24 * 60 * 60 * 1000) {
      return `Yesterday at ${hours}:${minutes}`;
    } else {
      return compDate.toDateString();
    }
  };
  return (
    <div className='oneChat'>
      <div className='oneChat__date'>
        {formatDate(
          Number(new Date(message.time).getFullYear()),
          Number(new Date(message.time).getMonth()),
          Number(new Date(message.time).getDate()),
          new Date(message.time).getMinutes(),
          new Date(message.time).getHours()
        )}
      </div>
      <div className='oneChat__bottom'>
        <div className='oneChat__left'>
          <img
            className='oneChat__avatar'
            src={
              message.sender.profileImage ? message.sender.profileImage : avatar
            }
          />
        </div>
        <div className='oneChat__middle'>
          <div className='oneChat__sendersName'>{`${message.sender.firstName} ${message.sender.lastName}`}</div>
          <div className='oneChat__chatCollection'>
            {message.messageList?.map((text, index) => (
              <div className='oneChat__singleText' key={index}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneChat;
