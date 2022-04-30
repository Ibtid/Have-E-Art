import React from 'react';
import './CompleteCheckout.css';

import { Link } from 'react-router-dom';
import ComponentWithOutSideBar from '../../layouts/ComponentWithOutSideBar';

function CompleteCheckout() {
  return (
    <ComponentWithOutSideBar>
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
    </ComponentWithOutSideBar>
  );
}

export default CompleteCheckout;
