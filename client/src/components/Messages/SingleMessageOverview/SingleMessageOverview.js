import React, { useContext, useEffect, useState } from 'react';

import avatar from '../../../assets/icons/avatar.svg';
import { Link } from 'react-router-dom';

import './SingleMessageOverview.css';
import { AppContext } from '../../../hooks/AppContext';

const SingleMessageOverview = ({room}) => {
  const [receiver, setReceiver] = useState({})
  const {contextStore, setContextStore} = useContext(AppContext)
  useEffect(() => {
    const leftParticipants = room.participants.filter(participant => participant._id.toString() !== contextStore.user._id.toString())
    setReceiver(leftParticipants[0])
  },[])
  return (
    <Link to={`/messages/${room._id}`} className='singleMessageOverview'>
      <div className='singleMessageOverview__imageContainer'>
        <img src={receiver.profileImage ? receiver.profileImage : avatar} className='singleMessageOverview__image' />
      </div>
      <div className='singleMessageOverview__text'>
        <div className='singleMessageOverview__nameAndActive'>
          <div className='singleMessageOverview__name'>{`${receiver.firstName} ${receiver.lastName}`}</div>
          <div className='singleMessageOverview__active'></div>
        </div>
        <div className='singleMessageOverview__message'>
          Hi, I need to get this job...
        </div>
      </div>
      <div className='singleMessageOverview__time'>2:21 AM</div>
    </Link>
  );
};

export default SingleMessageOverview;
