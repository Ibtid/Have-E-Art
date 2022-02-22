import React, { useState } from 'react';
import homeIconfilled from '../../../assets/icons/homeFilled.svg';
import favouritesOutline from '../../../assets/icons/favouritesOutline.svg';
import filtersOutline from '../../../assets/icons/filtersOutline.svg';
import followingOutline from '../../../assets/icons/followingOutline.svg';
import categoryOutline from '../../../assets/icons/categoryOutline.svg';
import popularArtistsOutline from '../../../assets/icons/popularArtistsOutline.svg';
import RecommendationsOutline from '../../../assets/icons/RecommendationsOutline.svg';
import homeOutlined from '../../../assets/icons/HomeOutline.svg';
import downArrow from '../../../assets/icons/downArrow.svg';

import favoriteFilled from '../../../assets/icons/favoritesFilled.svg';
import RecommendationsFilled from '../../../assets/icons/RecommendationFilled.svg';
import filterFilled from '../../../assets/icons/FilterFilled.svg';
import artistFilled from '../../../assets/icons/artistFilled.svg';
import followingPurpleFilled from '../../../assets/icons/followingPurpleFilled.svg';
import categoryFilled from '../../../assets/icons/category-variety-random-shuffle-svgrepo-com 1 (1).svg';

import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className='sidebar'>
      {/*Home*/}
      <Link
        to='/'
        className={
          selected === '' ? 'sidebar__item sidebar__active' : 'sidebar__item'
        }
        onClick={() => {
          setSelected('');
        }}>
        <div className='sidebar__iconContainer'>
          <img
            src={selected === '' ? homeIconfilled : homeOutlined}
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Home</div>
      </Link>

      {/*Favorites*/}
      <Link
        to='/favorites'
        className={
          selected === 'favorites'
            ? 'sidebar__item sidebar__active'
            : 'sidebar__item'
        }
        onClick={() => {
          setSelected('favorites');
        }}>
        <div className='sidebar__iconContainer'>
          <img
            src={selected === 'favorites' ? favoriteFilled : favouritesOutline}
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Favorites</div>
      </Link>

      {/*Recommendations*/}
      <Link
        to='/recommendations'
        className='sidebar__item'
        onClick={() => {
          setSelected('recommendations');
        }}>
        <div className='sidebar__iconContainer'>
          <img
            src={
              selected === 'recommendations'
                ? RecommendationsFilled
                : RecommendationsOutline
            }
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Recommendations</div>
      </Link>

      {/*Filters*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img
            src={
              selected === 'trending' ||
              selected === 'lastest' ||
              selected === 'topRated' ||
              selected === 'topCollections'
                ? filterFilled
                : filtersOutline
            }
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Filters</div>
      </div>

      <div className='sidebar__listItems'>
        <Link
          to='/trending'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('trending');
          }}>
          Trending
        </Link>
        <Link
          to='/lastest'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('lastest');
          }}>
          Lastest
        </Link>
        <Link
          to='/topRated'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('topRated');
          }}>
          Top Rated
        </Link>
        <Link
          to='/topCollections'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('topCollections');
          }}>
          Top Collections
        </Link>
      </div>

      <div className='sidebar__showMoreOption'>
        <div className='sidebar__iconContainer'>
          <img src={downArrow} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Show More</div>
      </div>

      {/*Category*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img
            src={
              selected === '3d' ||
              selected === 'people' ||
              selected === 'animal' ||
              selected === 'scenery'
                ? categoryFilled
                : categoryOutline
            }
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Category</div>
      </div>

      <div className='sidebar__listItems'>
        <Link
          to='/3d'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('3d');
          }}>
          3D
        </Link>
        <Link
          to='/people'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('people');
          }}>
          People
        </Link>
        <Link
          to='/animal'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('animal');
          }}>
          Animal
        </Link>
        <Link
          to='/scenery'
          className='sidebar__listItem'
          onClick={() => {
            setSelected('scenery');
          }}>
          Scenery
        </Link>
      </div>

      <div className='sidebar__showMoreOption'>
        <div className='sidebar__iconContainer'>
          <img src={downArrow} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Show More</div>
      </div>

      {/*Following*/}
      <Link
        to='/following'
        className='sidebar__item'
        onClick={() => {
          setSelected('following');
        }}>
        <div className='sidebar__iconContainer'>
          <img
            src={
              selected === 'following'
                ? followingPurpleFilled
                : followingOutline
            }
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Following</div>
      </Link>

      {/*artist*/}
      <Link
        to='/artist'
        className='sidebar__item'
        onClick={() => {
          setSelected('artist');
        }}>
        <div className='sidebar__iconContainer'>
          <img
            src={selected === 'artist' ? artistFilled : popularArtistsOutline}
            alt='homefilled'
          />
        </div>
        <div className='sidebar__name'>Popular Artists</div>
      </Link>
    </div>
  );
};

export default Sidebar;
