import React from 'react';

import avatar from '../../../assets/icons/avatar.svg';

import './OneChat.css';

const OneChat = ({ message }) => {
  const formatDate = (year, month, day, minutes, hours) => {
    const formatedTime = formatHoursAndMinute(hours, minutes);
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let compDate = new Date(year, month, day);
    let diff = today.getTime() - compDate.getTime();
    if (compDate.getTime() == today.getTime()) {
      return `Today at ${formatedTime}`;
    } else if (diff <= 24 * 60 * 60 * 1000) {
      return `Yesterday at ${formatedTime}`;
    } else if (diff <= 2 * 24 * 60 * 60 * 1000) {
      return `2 days ago at ${formatedTime}`;
    } else if (diff <= 3 * 24 * 60 * 60 * 1000) {
      return `3 days ago at ${formatedTime}`;
    } else {
      return `${compDate.toDateString()} at ${formatedTime}`;
    }
  };

  const formatHoursAndMinute = (hours, minutes) => {
    let meridiemStatus = 'AM';
    let formatedHours = '12';
    let formatedMinutes = '12';

    if (hours >= 12) {
      hours = hours - 12;
      meridiemStatus = 'PM';
    }
    if (hours === 0) {
      formatedHours = '12';
    }
    if (hours > 0 && hours < 10) {
      formatedHours = `0${hours}`;
    }

    if (minutes >= 0 && minutes < 10) {
      formatedMinutes = `0${minutes}`;
    }
    return `${formatedHours}:${formatedMinutes} ${meridiemStatus}`;
  };

  return (
    <div className='oneChat'>
      {message.messageList ? (
        <>
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
                  message.sender.profileImage
                    ? message.sender.profileImage
                    : avatar
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OneChat;
