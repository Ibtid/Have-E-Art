import React, { useContext, useEffect, useRef, useState } from 'react';

import avatar from '../../../assets/icons/avatar.svg';
import { Link } from 'react-router-dom';

import './SingleMessageOverview.css';
import { AppContext } from '../../../hooks/AppContext';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';

const SingleMessageOverview = ({ room }) => {
  const [receiver, setReceiver] = useState({});
  const { contextStore, setContextStore } = useContext(AppContext);
  const [activeSessionUpdate, setActiveSessionUpdate] = useState(0);
  const [activeSessions, _setActiveSessions] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const activeSessionRef = useRef(0);
  const setActiveSessions = (activeSessionss) => {
    activeSessionRef.current = activeSessionss;
    setActiveSessionUpdate((past) => past + 1);
  };
  useEffect(() => {}, []);
  useEffect(() => {
    _setActiveSessions(activeSessionRef.current);
  }, [activeSessionUpdate]);

  useEffect(() => {
    (async () => {
      const leftParticipants = room.participants.filter(
        (participant) =>
          participant._id.toString() !== contextStore.user._id.toString()
      );
      const receiver = leftParticipants[0];
      setReceiver(receiver);
      let response = await dispatch(actions.getUserActiveSessions, {
        userId: receiver._id,
      });
      console.log(response);
      if (response.errors) {
        return;
      }
      setActiveSessions(response.activeSessions);
      contextStore.socket.emit('joinUserSessionStatus', [receiver._id]);
      contextStore.socket.on(`session${receiver._id}`, sessionEventListener);
      return () => {
        contextStore.socket.off(sessionEventListener);
      };
    })();
  }, []);
  const sessionEventListener = (activeSessions) => {
    setActiveSessions(activeSessions);
  };
  return (
    <Link to={`/messages/${room._id}`} className='singleMessageOverview'>
      <div className='singleMessageOverview__imageContainer'>
        <img
          src={receiver.profileImage ? receiver.profileImage : avatar}
          className='singleMessageOverview__image'
        />
      </div>
      <div className='singleMessageOverview__text'>
        <div className='singleMessageOverview__nameAndActive'>
          <div className='singleMessageOverview__name'>{`${receiver.firstName} ${receiver.lastName}`}</div>
          {activeSessions > 0 && (
            <div className='singleMessageOverview__active'></div>
          )}
        </div>
        <div className='singleMessageOverview__messageContainer'>
          <div
            className={`singleMessageOverview__message ${
              unreadMessages !== 0 ? 'highlightedMessage' : ''
            }`}>
            Hi, I need to get this job beacuse i think you are not working
            ahaha!
          </div>
          {unreadMessages !== 0 && (
            <div className='singleMessageOverview__messageCircle'>
              {unreadMessages}
            </div>
          )}
        </div>
      </div>
      <div className='singleMessageOverview__time'>2:21 AM</div>
    </Link>
  );
};

export default SingleMessageOverview;
