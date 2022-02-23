import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './ProfileOptions.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../hooks/AppContext';

const ProfileOptions = (props) => {
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);
  let navigate = useNavigate();
  const value = useContext(AppContext);

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

  return ReactDOM.createPortal(
    <div
      className='notifications'
      onClick={() => {
        setShowForm(true);
      }}>
      <div ref={ref}>
        {showForm && (
          <div className='notifications__Container'>
            <div
              onClick={() => {
                props.closeForm();
                navigate('/profile');
              }}>
              View Profile
            </div>
            <div
              onClick={() => {
                value.setLoggedIn(false);
                props.closeForm();
                navigate('/');
              }}
              style={{ marginTop: '1rem' }}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('profileOptions')
  );
};

export default ProfileOptions;
