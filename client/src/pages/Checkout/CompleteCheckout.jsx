import React from 'react';
import './CompleteCheckout.css';

import { Link } from 'react-router-dom';
import BigImageComponent from '../../layouts/BigImageComponent';

function CompleteCheckout() {
  return (
    <BigImageComponent>
      <div>
        <div className='checkout-complete-heading'>Congratulations!</div>
        <div className='checkout-complete-sub-heading'>
          This e-art now belongs to you.
        </div>
        <div className='checkout-complete-button'>
          <Link to='/' className='back-home-button'>
            Go to Home
          </Link>
          <Link to='/MyCollection' className='back-collection-button'>
            Go to My collection
          </Link>
        </div>
      </div>
    </BigImageComponent>
  );
}

export default CompleteCheckout;
