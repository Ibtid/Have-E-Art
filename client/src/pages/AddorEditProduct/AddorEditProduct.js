import React from 'react';

import backIcon from '../../assets/icons/backIcon.svg';
import AddorEditProductText from '../../components/AddorEditProducts.js/AddorEditProductText';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';

import './AddorEditProduct.css';

const AddorEditProduct = (props) => {
  let image = false;
  return (
    <div className='app__scroll'>
      <SecondaryNav />
      <div className='app__goback'>
        <img src={backIcon} />
        <div>Go back</div>
      </div>
      <div className='app__bigImageComponent'>
        <div className='app__bigImageContainer'>
          {image && <img className='app__bigImage' src={image} alt='art' />}
          {!image && (
            <div className='addOrEditProduct__buttonGroup'>
              <div className='addOrEditProduct__accentButton'>Choose File</div>
              <div className='addOrEditProduct__buttonGroupText no_bold'>
                or
              </div>
              <div className='addOrEditProduct__buttonGroupText'>
                Drop your e-art here{' '}
              </div>
            </div>
          )}
        </div>
        <div className='app__bigImageText'>
          <AddorEditProductText />
        </div>
      </div>
    </div>
  );
};

export default AddorEditProduct;
