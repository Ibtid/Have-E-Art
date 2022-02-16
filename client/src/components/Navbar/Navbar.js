import React from 'react';
import searchIcon from '../../assets/icons/magnifyingGlass.svg';

import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>HAVEEART</div>
      <div className='navbar__searchbarContainer'>
        <input className='navbar__searchbar'></input>
        <div className='navbar__searchIconContainer'>
          <img src={searchIcon} alt='search' />
        </div>
      </div>
      <div className='navbar__authSection'>
        <div className='navbar__signup'>Sign Up</div>
      </div>
    </div>
  );
};

export default Navbar;
