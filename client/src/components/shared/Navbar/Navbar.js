import React, { useState } from 'react';
import searchIcon from '../../../assets/icons/magnifyingGlass.svg';
import avatar from '../../../assets/icons/avatar.svg';
import bellTcon from '../../../assets/icons/bellIcon.svg';
import Authentication from '../../../modals/Authentication/Authentication';
import { Link } from 'react-router-dom';

import './Navbar.css';
import Notifications from '../../../modals/Notifications/Notifications';

const Navbar = (props) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [toggleDisplay, setToggleDisplay] = useState(true);
  return (
    <div className='navbar'>
      {openNotifications && (
        <Notifications
          closeNotifications={() => {
            setOpenNotifications(false);
          }}
        />
      )}
      {openForm && (
        <Authentication
          closeForm={() => {
            setOpenForm(false);
          }}
        />
      )}
      <Link
        to='/'
        className={`navbar__logo ${toggleDisplay ? '' : 'no__display'}`}>
        HAVEEART
      </Link>
      <div className='navbar__searchbarContainer'>
        <input
          className={`navbar__searchbar ${
            !toggleDisplay ? 'show__display' : ''
          }`}
          placeholder='Search'></input>
        <div
          className='navbar__searchIconContainer'
          onClick={() => {
            setToggleDisplay(!toggleDisplay);
          }}>
          <img src={searchIcon} alt='search' />
        </div>
      </div>
      {!props.user && (
        <div
          className={`navbar__authSection ${
            toggleDisplay ? '' : 'no__display'
          }`}>
          <div
            className='navbar__signup'
            onClick={() => {
              setOpenForm(true);
            }}>
            Sign Up
          </div>
        </div>
      )}
      {props.user && (
        <div
          className={`navbar__authSection navbar__flexRow ${
            toggleDisplay ? '' : 'no__display'
          }`}>
          <div
            className='navbar__iconButton'
            style={{ marginRight: '5vw' }}
            onClick={() => {
              setOpenNotifications(true);
            }}>
            <img src={bellTcon} className='navbar__icon' alt='search' />
          </div>
          <Link
            to='/profile'
            className='navbar__iconButton'
            style={{ marginRight: '5vw' }}>
            <img src={avatar} className='navbar__icon' alt='search' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
