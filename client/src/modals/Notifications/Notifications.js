import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import image from '../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import './Notifications.css';

const Notifications = (props) => {
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setShowForm(false);
        props.closeForm();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showForm]);

  const soldNotification = () => {
    return (
      <div className='notifications__event'>
        <b>Color Burst</b> have been sold to <b>Mario Balotelli</b>
      </div>
    );
  };

  const followingNotification = () => {
    return (
      <div className='notifications__event'>
        <b>Boy Pablo</b> followed you
      </div>
    );
  };

  const newArtAddNotification = () => {
    return (
      <div className='notifications__event'>
        <b>Don Carlo</b> added new e-arts in his <b>Cars</b> collection
      </div>
    );
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
              <div className='notifications__oneNotification'>
                <img className='notifications__image' src={image} alt='' />
                <div className='notifications__textContainer'>
                  {soldNotification()}
                  <div className='notifications__time'>5 hours ago</div>
                </div>
              </div>
              <div className='notifications__oneNotification'>
                <img className='notifications__image' src={image} alt='' />
                <div className='notifications__textContainer'>
                  {followingNotification()}
                  <div className='notifications__time'>5 hours ago</div>
                </div>
              </div>
              <div className='notifications__oneNotification'>
                <img className='notifications__image' src={image} alt='' />
                <div className='notifications__textContainer'>
                  {newArtAddNotification()}
                  <div className='notifications__time'>5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('notifications')
  );
};

export default Notifications;
