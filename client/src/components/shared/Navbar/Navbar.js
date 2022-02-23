import React, { useState } from 'react';
import searchIcon from '../../../assets/icons/magnifyingGlass.svg';
import avatar from '../../../assets/icons/avatar.svg';
import bellTcon from '../../../assets/icons/bellIcon.svg';
import Authentication from '../../../modals/Authentication/Authentication';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import './Navbar.css';
import Notifications from '../../../modals/Notifications/Notifications';
import ProfileOptions from '../../../modals/ProfileOptions/ProfileOptions';

const Navbar = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const [toggleDisplay, setToggleDisplay] = useState(true);
  const value = useContext(AppContext);
  console.log(value);
  return (
    <div className='navbar'>
      {openProfileOptions && (
        <ProfileOptions
          closeForm={() => {
            setOpenProfileOptions(false);
          }}
        />
      )}
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
      {!value.loggedIn && (
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
      {value.loggedIn && (
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
          <div
            onClick={() => {
              setOpenProfileOptions(true);
            }}
            className='navbar__iconButton'
            style={{ marginRight: '5vw' }}>
            <img src={avatar} className='navbar__icon' alt='search' />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
