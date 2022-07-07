import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import { AppContext } from '../../hooks/AppContext';
import './Notifications.css';

const Notifications = (props) => {
  const { contextStore } = useContext(AppContext);
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setShowForm(false);
        props.closeNotifications();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showForm]);
  const onClickHighLight = (type, ref) => {
    setShowForm(false);
    props.closeNotifications();
    switch (type) {
      case 'user':
        navigate(`/user/earts/GalleryShowcase/${ref}`);
        break;
      default:
        console.log(type);
    }
  };
  const onClickNotification = (notification) => {
    console.log(notification);
    setShowForm(false);
    props.closeNotifications();
    switch (notification.type) {
      case 'user':
        navigate(`/user/earts/GalleryShowcase/${notification.user}`);
        break;
      case 'eart':
        break;
    }
  };
  return ReactDOM.createPortal(
    <div
      className='notifications'
      onClick={() => {
        setShowForm(true);
      }}>
      <div ref={ref}>
        {showForm && (
          <div className='notifications__Container'>
            <div className='notifications__title'>Notifications</div>
            <div className='notifications__scroll'>
              {contextStore.notifications.map((notification) => (
                <div className='notifications__oneNotification'>
                  <img className='notifications__image' src={image} alt='' />
                  <div className='notifications__textContainer'>
                    <div className='notifications__event'>
                      <b
                        onClick={() => {
                          onClickHighLight(
                            notification.highlightOne.type,
                            notification.highlightOne.ref
                          );
                        }}>
                        {notification.highlightOne.text}
                      </b>{' '}
                      {notification.noHighlight}{' '}
                      <b
                        onClick={() => {
                          onClickHighLight(
                            notification.highlightTwo.type,
                            notification.highlightTwo.ref
                          );
                        }}>
                        {notification.highlightTwo &&
                          notification.highlightTwo.text}
                      </b>
                    </div>
                    <div className='notifications__time'>5 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('notifications')
  );
};

export default Notifications;
