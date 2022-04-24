import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './ProfileOptions.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../hooks/AppContext';
import './ProfileOptions.css';

const ProfileOptions = (props) => {
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);
  let navigate = useNavigate();
  const {contextStore, setContextStore} = useContext(AppContext);

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
          <div className='profileOptions__Container'>
            <div
              className='profileOption__option'
              onClick={() => {
                props.closeForm();
                navigate('/profile');
              }}>
              View Profile
            </div>
            <div
              onClick={() => {
                localStorage.removeItem("user")
                setContextStore({...contextStore, loggedIn: false})
                props.closeForm();
                navigate('/');
              }}
              className='profileOption__option'
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
