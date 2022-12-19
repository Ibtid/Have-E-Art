import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Authentication.css';
import AuthForm from './AuthForm';

const Authentication = (props) => {
  const ref = useRef();
  const [pop, setPop] = useState('pop__up');
  const [isSignup, setIsSignup] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [openUserNameModal, setOpenUserNameModal] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        showForm &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !openUserNameModal
      ) {
        setPop('pop__down');
        setTimeout(() => {
          setShowForm(false);
          props.closeForm();
        }, 300);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showForm, openUserNameModal]);

  const handleSignUp = (e) => {
    setIsSignup(true);
    setShowForm(true);
  };

  const handleSignIn = (e) => {
    setIsSignup(false);
    setShowForm(true);
  };

  const authComponent = (
    <div ref={ref} className={pop}>
      {showForm && (
        <AuthForm
          closeForm={() => {
            setPop('pop__down');
            setTimeout(() => {
              props.closeForm();
            }, 300);
          }}
          isSignup={isSignup}
          handleSignUp={handleSignUp}
          handleSignIn={handleSignIn}
          openUserNameModal={openUserNameModal}
          setOpenUserNameModal={setOpenUserNameModal}
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(
    <div className='authentication'>{authComponent}</div>,
    document.getElementById('authentication')
  );
};

export default Authentication;
