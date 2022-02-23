import React from 'react';
import SecondaryNav from '../components/shared/SecondaryNav/SecondaryNav';
import Sidebar from '../components/shared/Sidebar/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../hooks/AppContext';

const ComponentWithSideBar = (props) => {
  const value = useContext(AppContext);
  return (
    <div className='app_bodyWithSideBar'>
      <Sidebar />
      <div>
        {value.loggedIn && <SecondaryNav />}
        <div
          className={
            value.loggedIn ? 'app__authenticated' : 'app__notAuthenticated'
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
