import React from 'react';

import './UserProfile.css';

import userImg from '../../assets/icons/avatar.svg';
import fb from '../../assets/icons/fb.svg';
import web from '../../assets/icons/web.svg';
import instagram from '../../assets/icons/instagram.svg';
import pinterest from '../../assets/icons/pinterest.svg';
import edit from '../../assets/icons/edit.svg';

import ForSale from '../../components/cards/ForSale/ForSale';
import ProductShowcaseCard from '../../components/cards/ProductShowcaseCard/ProductShowcaseCard';

const UserProfile = () => {
  const listingart = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  return (
    <div className='profile'>
      <div className='profile-head-section'>
        <div className='profile-heading'>Profile</div>
      </div>
      <div className='user-grid'>
        <div className='profile-img-section'>
          <div className='profile-img-back'>
            <img className='profile-img' src={userImg} alt='img' />
          </div>
        </div>
        <div className='user-info'>
          <div className='user-info-grid'>
            <div className='user-fullname-white'>Sananda</div>
            <div className='user-button-group'>
              <div className='profile-follow-button'>Follow</div>
              <div className='profile-msg-button'>Send Message</div>
            </div>
          </div>
          <div className='profile-username-accent'>sananda05</div>
          <div className='profile-user-bio'>
            By developing ideas with my clients and adapting new content to
            their needs, which sometimes involves combining 3D, videos, and
            photos, I like to call myself – a content creator.
          </div>
        </div>
        <div className='profile-contact'>
          <div className='profile-contact-info'>
            <img className='profile-contact-info-icon' src={fb} alt='fb' />
            <div className='profile-contact-info-text'>sananda05</div>
          </div>
          <div className='profile-contact-info'>
            <img className='profile-contact-info-icon' src={web} alt='web' />
            <div className='profile-contact-info-text'>www.nafizimtiaz.com</div>
          </div>
          <div className='profile-contact-info'>
            <img
              className='profile-contact-info-icon'
              src={instagram}
              alt='instagram'
            />
            <div className='profile-contact-info-text'>nafiz6969</div>
          </div>
          <div className='profile-contact-info'>
            <img
              className='profile-contact-info-icon'
              src={pinterest}
              alt='pinterest'
            />
            <div className='profile-contact-info-text'>mafizimt29</div>
          </div>
        </div>
      </div>
      <br />
      <div className='user-grid-section2'>
        <div className='user-sub-heading'>E-arts</div>
        <div className='user-text-grey'>nafizimtiaz@gmail.com</div>
        <div className='profile-card-container reduce__margin'>
          {listingart.map((a) => (
            <div className='userProfile__card'>
              <ProductShowcaseCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
