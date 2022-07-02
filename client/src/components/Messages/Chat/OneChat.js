import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './OneChat.css';

const OneChat = ({ message }) => {
  // function getDisplayDate(chatTime) {
  //   let time = new Date(chatTime);
  //   let today = new Date();
  //   today.setHours(0);
  //   today.setMinutes(0);
  //   today.setSeconds(0);
  //   today.setMilliseconds(0);
  //   let compDate = new Date(time.getYear(), time.getMonth(), time.getDay()); // month - 1 because January == 0
  //   let diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
  //   if (compDate.getTime() == today.getTime()) {
  //     return 'Today';
  //   } else if (diff <= 24 * 60 * 60 * 1000) {
  //     return 'Yesterday';
  //   } else {
  //     return compDate.toDateString(); // or format it what ever way you want
  //   }
  // }
  return (
    <div className='oneChat'>
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
          <div className='oneChat__singleText'>{message.text}</div>
        </div>
      </div>
      <div className='oneChat__right'>
        <div className='oneChat__date'>2:21 AM</div>
      </div>
    </div>
  );
};

export default OneChat;
