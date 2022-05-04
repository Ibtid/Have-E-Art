import React, { useContext, useEffect, useState } from 'react';
import EditProductText from '../../components/AddorEditProducts.js/EditProductText';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import backIcon from '../../assets/icons/backIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../hooks/AppContext';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';

const EditProduct = () => {
  const { contextStore, setContextStore } = useContext(AppContext);
  const { id } = useParams();
  const [eart, setEart] = useState({
    owner: {},
    creator: {},
    gallery: {},
    flag: {},
  });
  let history = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await dispatch(
        actions.getEart,
        { id },
        {},
        contextStore.user.token
      );
      if (response.errors) {
        return;
      }
      setEart(response);
    })();
  }, []);
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
          <img className='app__bigImage' src={eart.imgUrl} alt='art' />
        </div>
        <div className='app__bigImageText'>
          <EditProductText eart={eart} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
