import React from 'react';
import homeIconfilled from '../../assets/icons/homeFilled.svg';
import favouritesOutline from '../../assets/icons/favouritesOutline.svg';
import filtersOutline from '../../assets/icons/filtersOutline.svg';
import followingOutline from '../../assets/icons/followingOutline.svg';
import categoryOutline from '../../assets/icons/categoryOutline.svg';
import popularArtistsOutline from '../../assets/icons/popularArtistsOutline.svg';
import RecommendationsOutline from '../../assets/icons/RecommendationsOutline.svg';

import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/*Home*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={homeIconfilled} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Home</div>
      </div>

      {/*Favorites*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={favouritesOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Favorites</div>
      </div>

      {/*Recommendations*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={RecommendationsOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Recommendations</div>
      </div>

      {/*Filters*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={filtersOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Filters</div>
      </div>

      {/*Category*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={categoryOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Category</div>
      </div>

      {/*Following*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={followingOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Following</div>
      </div>

      {/*Following*/}
      <div className='sidebar__item'>
        <div className='sidebar__iconContainer'>
          <img src={popularArtistsOutline} alt='homefilled' />
        </div>
        <div className='sidebar__name'>Popular Artists</div>
      </div>
    </div>
  );
};

export default Sidebar;
