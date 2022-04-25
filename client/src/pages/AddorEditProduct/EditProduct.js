import React, { useContext } from 'react';
import EditProductText from '../../components/AddorEditProducts.js/EditProductText';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import backIcon from '../../assets/icons/backIcon.svg';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../hooks/AppContext';

const EditProduct = () => {
  const {contextStore, setContextStore} = useContext(AppContext)
  let history = useNavigate();
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
      <div className='app__bigImageComponent'>
        <div className='app__bigImageContainer'>
          <img
            className='app__bigImage'
            src={contextStore.eart.imgUrl}
            alt='art'
          />
        </div>
        <div className='app__bigImageText'>
          <EditProductText />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
