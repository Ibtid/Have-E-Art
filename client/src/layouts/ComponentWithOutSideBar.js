import React from 'react';
import image1 from '../assets/images/pexels-ayswarya-aish-2109147.jpg';
import backIcon from '../assets/icons/backIcon.svg';
import SecondaryNav from '../components/shared/SecondaryNav/SecondaryNav';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../hooks/AppContext';

const ComponentWithOutSideBar = (props) => {
  let history = useNavigate();
  const value = useContext(AppContext);

  return (
    <div className='app__scroll'>
      {value.loggedIn && <SecondaryNav />}
      {/*Change Component*/}
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
          <img className='app__bigImage' src={image1} alt='art' />
        </div>
        <div className='app__bigImageText'>{props.children}</div>
      </div>
    </div>
  );
};

export default ComponentWithOutSideBar;
