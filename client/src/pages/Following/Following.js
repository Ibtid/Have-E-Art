import React from 'react';
import FollowingList from '../../components/Following/FollowingList';

import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';

const Following = () => {
  return (
    <ComponentWithSideBar>
      <FollowingList />
    </ComponentWithSideBar>
  );
};

export default Following;
