import React, { useState } from 'react';
import GalleryDetails from '../MyCollection/GalleryDetail/GalleryDetails';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileShowCase.css';

const ProfileShowCase = (props) => {
  let navigation = useNavigate();
  const [openGallery, setOpenGallery] = useState(false);
  const [navItem, setNavItem] = useState(() => {
    if (window.location.toString().includes('BoughtShowcase')) {
      return 'BoughtShowcase';
    }
    if (window.location.toString().includes('ForSaleShowcase')) {
      return 'ForSaleShowcase';
    }
    if (window.location.toString().includes('OwnedShowcase')) {
      return 'OwnedShowcase';
    } else return 'GalleryShowcase';
  });
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [toggleDisplayfloatButton, setToggleDisplayfloatButton] =
    useState(false);
  const clickNav = (item) => {
    setNavItem(item);
    navigation(`/user/earts/${item}/1`);
  };

  return (
    <div className='profileShowcase'>
      <div className='profileShowcaseNav'>
        <div
          className={
            navItem === 'GalleryShowcase'
              ? 'myCollection__navItem active'
              : 'myCollection__navItem'
          }
          onClick={() => {
            clickNav('GalleryShowcase');
          }}>
          Gallery
        </div>
        <div
          className={
            navItem === 'OwnedShowcase'
              ? 'myCollection__navItem active'
              : 'myCollection__navItem'
          }
          onClick={() => {
            clickNav('OwnedShowcase');
          }}>
          Owned
        </div>
        <div
          className={
            navItem === 'CopyShowcase'
              ? 'myCollection__navItem active'
              : 'myCollection__navItem'
          }
          onClick={() => {
            clickNav('CopyShowcase');
          }}>
          Copy
        </div>
      </div>
      {openGallery ? (
        <GalleryDetails
          openGallery={() => {
            setOpenGallery(false);
          }}
        />
      ) : (
        <div className='profileShowCase__scroll'>{props.children}</div>
      )}
    </div>
  );
};

export default ProfileShowCase;
