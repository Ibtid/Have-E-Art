import React, { useState } from 'react';
import searchIcon from '../../../assets/icons/magnifyingGlass.svg';
import avatar from '../../../assets/icons/avatar.svg';
import bellTcon from '../../../assets/icons/bellIcon.svg';

import './Navbar.css';

const Navbar = (props) => {
  const [toggleDisplay, setToggleDisplay] = useState(true);
  return (
    <div className='navbar'>
      <div className={`navbar__logo ${toggleDisplay ? '' : 'no__display'}`}>
        HAVEEART
      </div>
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
          <div className='navbar__signup'>Sign Up</div>
        </div>
      )}
      {props.user && (
        <div
          className={`navbar__authSection navbar__flexRow ${
            toggleDisplay ? '' : 'no__display'
          }`}>
          <div className='navbar__iconButton' style={{ marginRight: '5vw' }}>
            <img src={bellTcon} className='navbar__icon' alt='search' />
          </div>
          <div className='navbar__iconButton' style={{ marginRight: '5vw' }}>
            <img src={avatar} className='navbar__icon' alt='search' />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
