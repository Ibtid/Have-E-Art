import React from 'react';
import BoughtCard from '../../components/cards/BoughtCard/BoughtCard';
import './MyCollection.css';

const MyCollection = () => {
  return (
    <div className='myCollection'>
      <div className='myCollection__nav'>
        <div className='myCollection__navItem'>Bought</div>
        <div className='myCollection__navItem'>For Sale</div>
        <div className='myCollection__navItem'>Gallery</div>
      </div>

      <div className='myCollection__scroll'>
        <div className='home__cardContainer'>
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
          <BoughtCard />
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
