import React, { useState } from 'react';
import BoughtCard from '../../components/cards/BoughtCard/BoughtCard';
import ForSale from '../../components/cards/ForSale/ForSale';
import Gallery from '../../components/cards/Gallery/Gallery';
import plus from '../../assets/icons/plusIcon.svg';
import './MyCollection.css';
import GalleryDetails from '../../components/MyCollection/GalleryDetail/GalleryDetails';
import GalleryIcon from '../../assets/icons/gallery-svgrepo-com 1.svg';
import imageIcon from '../../assets/icons/imageIcon.svg';
import { Link } from 'react-router-dom';
import NewGroup from '../../modals/NewGroup/NewGroup';

const MyCollection = () => {
  const [openGallery, setOpenGallery] = useState(false);
  const [navItem, setNavItem] = useState('bought');
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [toggleDisplayfloatButton, setToggleDisplayfloatButton] =
    useState(false);
  const clickNav = (item) => {
    setNavItem(item);
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
              navItem === 'bought'
                ? 'myCollection__navItem active'
                : 'myCollection__navItem'
            }
            onClick={() => {
              clickNav('bought');
            }}>
            Bought
          </div>
          <div
            className={
              navItem === 'sale'
                ? 'myCollection__navItem active'
                : 'myCollection__navItem'
            }
            onClick={() => {
              clickNav('sale');
            }}>
            For Sale
          </div>
          <div
            className={
              navItem === 'gallery'
                ? 'myCollection__navItem active'
                : 'myCollection__navItem'
            }
            onClick={() => {
              clickNav('gallery');
            }}>
            Gallery
          </div>
          {navItem === 'bought' && (
            <div className='myCollection__activeBarLeft'></div>
          )}
          {navItem === 'sale' && (
            <div className='myCollection__activeBarMiddle'></div>
          )}
          {navItem === 'gallery' && (
            <div className='myCollection__activeBarRight'></div>
          )}
        </div>
        {navItem === 'gallery' && (
          <div style={{ display: 'flex' }}>
            <div
              className='myCollection__addButton'
              onClick={() => {
                setOpenNewGroup(true);
              }}>
              <img src={plus} alt='+' />
              New Group
            </div>
            <Link to='/product/add' className='myCollection__addButton'>
              <img src={plus} alt='+' />
              Add Gallery
            </Link>
          </div>
        )}
      </div>
      {openGallery ? (
        <GalleryDetails
          openGallery={() => {
            setOpenGallery(false);
          }}
        />
      ) : (
        <div className='myCollection__scroll'>
          {navItem === 'gallery' && (
            <div className=' gallery__rowGap'>
              {listingart.map((a) => (
                <Gallery
                  openGallery={() => {
                    setOpenGallery(true);
                  }}
                />
              ))}
            </div>
          )}

          {navItem === 'sale' && (
            <div className='home__cardContainer'>
              {listingart.map((a) => (
                <ForSale />
              ))}
            </div>
          )}
          {navItem === 'bought' && (
            <div className='home__cardContainer'>
              {listingart.map((a) => (
                <BoughtCard />
              ))}
            </div>
          )}
        </div>
      )}
      {navItem === 'gallery' && (
        <div
          className='myCollection__floatButton'
          onClick={() => {
            setToggleDisplayfloatButton(!toggleDisplayfloatButton);
          }}>
          <img
            style={{ height: '1.5rem', width: '1.5rem' }}
            src={plus}
            alt='+'
          />
        </div>
      )}
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

export default MyCollection;
