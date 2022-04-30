import React, { useState } from 'react';
import plus from '../../../assets/icons/plusIcon.svg';
import './MyCollection.css';
import GalleryDetails from '../GalleryDetail/GalleryDetails';
import GalleryIcon from '../../../assets/icons/gallery-svgrepo-com 1.svg';
import imageIcon from '../../../assets/icons/imageIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import NewGroup from '../../../modals/NewGroup/NewGroup';

const ShowCaseContainer = (props) => {
  let navigation = useNavigate();
  const [openGallery, setOpenGallery] = useState(false);
  const [navItem, setNavItem] = useState('BoughtShowcase');
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [toggleDisplayfloatButton, setToggleDisplayfloatButton] =
    useState(false);
  const clickNav = (item) => {
    setNavItem(item);
    navigation(`/MyCollection/${item}`);
  };
  const listingart = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  return (
    <div className='myCollection'>
      {openNewGroup && (
        <NewGroup
          closeForm={() => {
            setOpenNewGroup(false);
          }}
        />
      )}
      <div className='myCollection__navWithAddButton'>
        <div className='myCollection__nav'>
          <div
            className={
              navItem === 'BoughtShowcase'
                ? 'myCollection__navItem active'
                : 'myCollection__navItem'
            }
            onClick={() => {
              clickNav('BoughtShowcase');
            }}>
            Bought
          </div>
          <div
            className={
              navItem === 'ForSaleShowcase'
                ? 'myCollection__navItem active'
                : 'myCollection__navItem'
            }
            onClick={() => {
              clickNav('ForSaleShowcase');
            }}>
            For Sale
          </div>
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
          {navItem === 'BoughtShowcase' && (
            <div className='myCollection__activeBarLeft'></div>
          )}
          {navItem === 'ForSaleShowcase' && (
            <div className='myCollection__activeBarMiddle'></div>
          )}
          {navItem === 'GalleryShowcase' && (
            <div className='myCollection__activeBarRight'></div>
          )}
          {navItem === 'OwnedShowcase' && (
            <div className='myCollection__activeBarRightMost'></div>
          )}
        </div>

        <div style={{ display: 'flex' }}>
          <div
            className='myCollection__addButton'
            onClick={() => {
              setOpenNewGroup(true);
            }}>
            <img src={plus} alt='+' />
            New Gallery
          </div>
          <Link to='/product/add' className='myCollection__addButton'>
            <img src={plus} alt='+' />
            Add E-art
          </Link>
        </div>
      </div>
      {openGallery ? (
        <GalleryDetails
          openGallery={() => {
            setOpenGallery(false);
          }}
        />
      ) : (
        <div className='myCollection__scroll'>{props.children}</div>
      )}

      <div
        className='myCollection__floatButton'
        onClick={() => {
          setToggleDisplayfloatButton(!toggleDisplayfloatButton);
        }}>
        <img style={{ height: '1.5rem', width: '1.5rem' }} src={plus} alt='+' />
      </div>

      {toggleDisplayfloatButton && (
        <>
          <Link
            to='/product/add'
            className='myCollection__floatButton myCollection__galleryFloat'>
            <img
              style={{ height: '1.5rem', width: '1.5rem' }}
              src={GalleryIcon}
              alt='+'
            />
          </Link>
          <div
            className='myCollection__floatButton myCollectionGroupFloat'
            onClick={() => {
              setOpenNewGroup(true);
            }}>
            <img
              style={{ height: '1.5rem', width: '1.5rem' }}
              src={imageIcon}
              alt='+'
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShowCaseContainer;
