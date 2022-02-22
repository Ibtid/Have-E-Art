import React, { useState, useEffect } from 'react';

import followingOutline from '../../../assets/icons/followingIcon.svg';
import followingFilled from '../../../assets/icons/followingFilled.svg';
import messageOutline from '../../../assets/icons/messageOutline.svg';
import messageFilled from '../../../assets/icons/MessagesFilled.svg';
import collectionOutline from '../../../assets/icons/myCollectionOutline.svg';
import myCollectionFilled from '../../../assets/icons/mtCollectionFilled.svg';

import { Link } from 'react-router-dom';

import './SecondaryNav.css';

const SecondaryNav = () => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className='secondaryNav'>
      <Link
        to='/following'
        className={
          selected.includes('/following')
            ? 'secondaryNav__option accent__background'
            : 'secondaryNav__option'
        }>
        <div className='secondaryNav__imageContainer'>
          <img
            className='secondaryNav__image'
            src={
              selected.includes('/following')
                ? followingFilled
                : followingOutline
            }
          />
        </div>
        <div className='secondaryNav__optionText'>Following</div>
      </Link>
      <Link
        to='/messages'
        className={
          selected.includes('messages')
            ? 'secondaryNav__option accent__background'
            : 'secondaryNav__option'
        }>
        <div className='secondaryNav__imageContainer'>
          <img
            className='secondaryNav__image'
            src={selected.includes('messages') ? messageFilled : messageOutline}
          />
        </div>
        <div className='secondaryNav__optionText'>Messages</div>
      </Link>
      <Link
        to='/MyCollection'
        className={
          selected.includes('MyCollection')
            ? 'secondaryNav__option accent__background'
            : 'secondaryNav__option'
        }>
        <div className='secondaryNav__imageContainer'>
          <img
            className='secondaryNav__image'
            src={
              selected.includes('MyCollection')
                ? myCollectionFilled
                : collectionOutline
            }
          />
        </div>
        <div className='secondaryNav__optionText'>My Collection</div>
      </Link>
    </div>
  );
};

export default SecondaryNav;
