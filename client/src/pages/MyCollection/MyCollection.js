import React, { useState } from 'react';
import BoughtCard from '../../components/cards/BoughtCard/BoughtCard';
import ForSale from '../../components/cards/ForSale/ForSale';
import Gallery from '../../components/cards/Gallery/Gallery';
import plus from '../../assets/icons/plusIcon.svg';
import './MyCollection.css';
import GalleryDetails from '../../components/MyCollection/GalleryDetail/GalleryDetails';

const MyCollection = () => {
  let details = false;
  const [navItem, setNavItem] = useState('bought');
  const clickNav = (item) => {
    setNavItem(item);
  };
  const listingart = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  return (
    <div className='myCollection'>
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
            <div className='myCollection__addButton'>
              <img src={plus} alt='+' />
              New Group
            </div>
            <div className='myCollection__addButton'>
              <img src={plus} alt='+' />
              Add Gallery
            </div>
          </div>
        )}
      </div>
      {details ? (
        <GalleryDetails />
      ) : (
        <div className='myCollection__scroll'>
          {navItem === 'gallery' && (
            <div className=' gallery__rowGap'>
              {listingart.map((a) => (
                <Gallery />
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
        <div className='myCollection__floatButton'>
          <img
            style={{ height: '1.5rem', width: '1.5rem' }}
            src={plus}
            alt='+'
          />
        </div>
      )}
    </div>
  );
};

export default MyCollection;
