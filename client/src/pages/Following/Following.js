import React from 'react';
import OneFollowingUser from '../../components/Following/OneFollowingUser';

import './Following.css';

const Following = () => {
  return (
    <div className='following'>
      <OneFollowingUser />
      <OneFollowingUser />
      <OneFollowingUser />
    </div>
  );
};

export default Following;
