import React from 'react';

import followingOutline from '../../../assets/icons/followingIcon.svg';
import messageOutline from '../../../assets/icons/messageOutline.svg';
import collectionOutline from '../../../assets/icons/myCollectionOutline.svg';

import './SecondaryNav.css';

const SecondaryNav = () => {
  return (
    <div className='secondaryNav'>
      <div className='secondaryNav__option'>
        <div className='secondaryNav__imageContainer'>
          <img className='secondaryNav__image' src={followingOutline} />
        </div>
        <div className='secondaryNav__optionText'>Following</div>
      </div>
      <div className='secondaryNav__option'>
        <div className='secondaryNav__imageContainer'>
          <img className='secondaryNav__image' src={messageOutline} />
        </div>
        <div className='secondaryNav__optionText'>Messages</div>
      </div>
      <div className='secondaryNav__option'>
        <div className='secondaryNav__imageContainer'>
          <img className='secondaryNav__image' src={collectionOutline} />
        </div>
        <div className='secondaryNav__optionText'>My Collection</div>
      </div>
    </div>
  );
};

export default SecondaryNav;
