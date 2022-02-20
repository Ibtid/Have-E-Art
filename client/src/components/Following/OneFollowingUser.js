import React from 'react';

import rightArrow from '../../assets/icons/rightArrow.svg';
import ProductShowcaseCard from '../cards/ProductShowcaseCard/ProductShowcaseCard';
import useWindowDimensions from '../../hooks/useWindowDimension';
import './OneFollowingUser.css';

const OneFollowingUser = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div className='OneFollowingUser'>
      <div className='OneFollowingUser__rowOne'>
        <div className='OneFollowingUser__name'>More from Don Carlo</div>
        <div className='OneFollowingUser__viewMoreContainer'>
          View More
          <img src={rightArrow} alt='>' />
        </div>
      </div>

      {width <= 720 && (
        <div className='OneFollowingUser__rowTwo gridWithOneItems'>
          <ProductShowcaseCard />
        </div>
      )}

      {width <= 1200 && width > 720 && (
        <div className='OneFollowingUser__rowTwo gridWithTwoItems'>
          <ProductShowcaseCard />
          <ProductShowcaseCard />
        </div>
      )}

      {width <= 1700 && width > 1200 && (
        <div className='OneFollowingUser__rowTwo gridWithThreeItems'>
          <ProductShowcaseCard />
          <ProductShowcaseCard />
          <ProductShowcaseCard />
        </div>
      )}

      {width <= 2100 && width > 1700 && (
        <div className='OneFollowingUser__rowTwo gridWithFourItems'>
          <ProductShowcaseCard />
          <ProductShowcaseCard />
          <ProductShowcaseCard />
          <ProductShowcaseCard />
        </div>
      )}
    </div>
  );
};

export default OneFollowingUser;
