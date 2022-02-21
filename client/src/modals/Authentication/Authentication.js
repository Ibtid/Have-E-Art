import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Authentication.css';
import AuthForm from './AuthForm';

const Authentication = (props) => {
  const ref = useRef();
  const [isSignup, setIsSignup] = useState(true);
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

  const handleSignUp = (e) => {
    setIsSignup(true);
    setShowForm(true);
  };

  const handleSignIn = (e) => {
    setIsSignup(false);
    setShowForm(true);
  };

  const authComponent = (
    <div ref={ref}>
      {showForm && (
        <AuthForm
          isSignup={isSignup}
          handleSignUp={handleSignUp}
          handleSignIn={handleSignIn}
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
