import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './Authentication.css';
import AuthForm from './AuthForm';

const Authentication = () => {
  
  
  const [isSignup, setIsSignup] = useState(true)

  const handleSignUp = e =>{
      setIsSignup(true)
      console.log(isSignup)
  }

  const handleSignIn = e =>{
    setIsSignup(false)
    console.log(isSignup)
  }
  
  const authComponent =
  <div>
    <AuthForm isSignup={isSignup} handleSignUp={handleSignUp} handleSignIn={handleSignIn}/>
  </div>

  // const signinComponent = 
  // <div>
  //   <AuthForm handleAuthOption={handleAuthOption} isSignup={false}/>
  // </div>;

  // const signupComponent = 
  // <div>
  //   <AuthForm handleAuthOption={handleAuthOption} isSignup={true} />
  // </div>;
  
  
  return ReactDOM.createPortal(
    <div className='authentication'>{authComponent}</div>,
    document.getElementById('authentication')
  );
};

export default Authentication;
