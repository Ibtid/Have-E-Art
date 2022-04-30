import React from 'react';
import OneFollowingUser from '../OneFollowingUser';

import './Following.css';

const All_Followings = () => {
  return (
    <div className='following'>
      <OneFollowingUser />
      <OneFollowingUser />
      <OneFollowingUser />
    </div>
  );
};

export default All_Followings;
