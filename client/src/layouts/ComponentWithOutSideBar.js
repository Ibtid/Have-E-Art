import React from 'react';
import SecondaryNav from '../components/shared/SecondaryNav/SecondaryNav';

const ComponentWithOutSideBar = (props) => {
  return (
    <div>
      <div className='app__scroll'>
        {props.signedIn && <SecondaryNav />}
        {/*Change Component*/}
        <div className='app__goback'>
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
    </div>
  );
};

export default ComponentWithOutSideBar;
