import React, { useContext } from 'react';
import './CompleteCheckout.css';

import { Link } from 'react-router-dom';
import BigImageComponent from '../../layouts/BigImageComponent';
import { AppContext } from '../../hooks/AppContext';

function CompleteCheckout() {
  const {contextStore} = useContext(AppContext)
  return (
    <BigImageComponent imgUrl = {contextStore.eart.imgUrl}>
      <div>
        <div className='checkout-complete-heading'>Congratulations!</div>
        <div className='checkout-complete-sub-heading'>
          {contextStore.eart.title} now belongs to you.
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
