import React, { useState } from 'react';

import backIcon from '../../assets/icons/backIcon.svg';

import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import { useNavigate } from 'react-router-dom';

import './AddProduct.css';
import AddProductText from '../../components/AddorEditProducts.js/AddProductText';

const AddorEditProduct = (props) => {
  let history = useNavigate();
  const [image, setImage] = useState(null);
  const onChangeInputPicture = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  return (
    <div className='app__scroll'>
      <SecondaryNav />
      <div
        className='app__goback'
        onClick={() => {
          history(-1);
        }}>
        <img src={backIcon} />
        <div>Go back</div>
      </div>
      <div className='app__bigImageComponent fadeIn'>
        <div className='app__bigImageContainer'>
          {image && (
            <img
              className='app__bigImage'
              src={URL.createObjectURL(image)}
              alt='art'
            />
          )}
          {!image && (
            <div className='addOrEditProduct__buttonGroup'>
              <label className='addOrEditProduct__accentButton'>
                <input
                  type={'file'}
                  onChange={onChangeInputPicture}
                  accept={'image/*'}
                />
                Choose File
              </label>
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
          <AddProductText image={image} />
          <div className='illusionNav'></div>
        </div>
      </div>
    </div>
  );
};

export default AddorEditProduct;
