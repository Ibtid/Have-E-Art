import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './Authentication.css';

const Authentication = (props) => {
  const signinComponent = <div></div>;

  const signupComponent = <div></div>;

  const [component, setComponent] = useState(signupComponent);

  return ReactDOM.createPortal(
    <div className='authentication'>{component}</div>,
    document.getElementById('authentication')
  );
};

export default Authentication;
