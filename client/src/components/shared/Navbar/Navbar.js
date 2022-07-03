import React, { useEffect, useRef, useState } from 'react';
import searchIcon from '../../../assets/icons/magnifyingGlass.svg';
import avatar from '../../../assets/icons/avatar.svg';
import bellTcon from '../../../assets/icons/bellIcon.svg';
import Authentication from '../../../modals/Authentication/Authentication';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import './Navbar.css';
import Notifications from '../../../modals/Notifications/Notifications';
import ProfileOptions from '../../../modals/ProfileOptions/ProfileOptions';

const Navbar = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const [toggleDisplay, setToggleDisplay] = useState(true);
  const { contextStore, setContextStore } = useContext(AppContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationUpdate, setNotificationUpdate] = useState(0);
  const notificationsRef = useRef(contextStore.notifications);
  const setNotifications = (data) => {
    notificationsRef.current = data;
    setNotificationUpdate((past) => past + 1);
  };
  useEffect(() => {
    if (contextStore.loggedIn) {
      let count = 0;
      contextStore.notifications.map((notification) => {
        if (!notification.viewStatus) {
          count = count + 1;
        }
      });
      setNotificationCount(count);
    }
  }, [contextStore.notifications]);
  useEffect(() => {
    if (contextStore.socket) {
      contextStore.socket.on('notification', (notification) => {
        console.log(notification);
        const vNotifications = notificationsRef.current;
        vNotifications.unshift(notification);
        setNotifications(vNotifications);
      });
      return () => {
        contextStore.socket.off('notification');
      };
    }
  }, [contextStore.socket]);
  useEffect(() => {
    setContextStore({
      ...contextStore,
      notifications: notificationsRef.current,
    });
  }, [notificationUpdate]);
  return (
    <div className='navbar'>
      {openProfileOptions && (
        <ProfileOptions
          closeForm={() => {
            setOpenProfileOptions(false);
          }}
        />
      )}
      {openNotifications && (
        <Notifications
          closeNotifications={() => {
            setOpenNotifications(false);
          }}
        />
      )}
      {openForm && (
        <Authentication
          closeForm={() => {
            setOpenForm(false);
          }}
        />
      )}
      <Link
        to='/'
        className={`navbar__logo ${toggleDisplay ? '' : 'no__display'}`}>
        HAVEEART
      </Link>
      <div className='navbar__searchbarContainer'>
        <input
          className={`navbar__searchbar ${
            !toggleDisplay ? 'show__display' : ''
          }`}
          placeholder='Search'></input>
        <div
          className='navbar__searchIconContainer'
          onClick={() => {
            setToggleDisplay(!toggleDisplay);
          }}>
          <img src={searchIcon} alt='search' />
        </div>
      </div>
      {!contextStore.loggedIn && (
        <div
          className={`navbar__authSection ${
            toggleDisplay ? '' : 'no__display'
          }`}>
          <div
            className='navbar__signup'
            onClick={() => {
              setOpenForm(true);
            }}>
            Sign Up
          </div>
        </div>
      )}
      {contextStore.loggedIn && (
        <div
          className={`navbar__authSection navbar__flexRow ${
            toggleDisplay ? '' : 'no__display'
          }`}>
          {notificationCount !== 1 ? (
            <div className='navbar__shakeIcon'>
              <div
                className='navbar__iconButton'
                onClick={() => {
                  setOpenNotifications(true);
                }}>
                <img
                  src={bellTcon}
                  className='navbar__icon shake'
                  alt='search'
                />
              </div>
              <div className='navbar__notificationNumber'>
                {notificationCount}
              </div>
            </div>
          ) : (
            <div
              className='navbar__iconButton'
              style={{ marginRight: '3rem' }}
              onClick={() => {
                setOpenNotifications(true);
              }}>
              <img src={bellTcon} className='navbar__icon' alt='search' />
            </div>
          )}

          <div
            onClick={() => {
              setOpenProfileOptions(true);
            }}
            className='navbar__iconButton'
            style={{ marginRight: '5vw' }}>
            <img
              src={
                contextStore.user
                  ? contextStore.user.profileImage
                    ? contextStore.user.profileImage
                    : avatar
                  : avatar
              }
              className='navbar__icon'
              alt='search'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
