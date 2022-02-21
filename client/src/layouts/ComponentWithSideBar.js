import React from 'react';
import SecondaryNav from '../components/shared/SecondaryNav/SecondaryNav';
import Sidebar from '../components/shared/Sidebar/Sidebar';

const ComponentWithSideBar = (props) => {
  return (
    <div className='app_bodyWithSideBar'>
      <Sidebar />
      <div>
        {props.signedIn && <SecondaryNav />}
        <div
          className={
            props.signedIn ? 'app__authenticated' : 'app__notAuthenticated'
          }>
          {/*Change Component*/}
          {props.children}
          <div className='home__scrollShade'></div>
        </div>
      </div>
    </div>
  );
};

export default ComponentWithSideBar;
