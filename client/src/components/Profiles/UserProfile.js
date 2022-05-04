import React from 'react';

import './UserProfile.css';

import userImg from '../../assets/icons/avatar.svg';
import fb from '../../assets/icons/fb.svg';
import web from '../../assets/icons/web.svg';
import instagram from '../../assets/icons/instagram.svg';
import pinterest from '../../assets/icons/pinterest.svg';

import ProductShowcaseCard from '../cards/ProductShowcaseCard/ProductShowcaseCard';

const UserProfile = () => {
  const listingart = [];

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
          <div className='userInfo__nameAndButtons'>
            <div className='userInfo__name'>Nafiz Imtiaz</div>
            <div className='userInfo__buttonGroup'>
              <div className='userInfo__accentButton'>Follow</div>
              <div className='userInfo__accentOutLine'>Send Message</div>
              <div></div>
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
