import React from 'react';
import UserProfile from '../../components/Profiles/UserProfile';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';

const UserProfilePage = () => {
  return (
    <ComponentWithSideBar>
      <UserProfile />
    </ComponentWithSideBar>
  );
};

export default UserProfilePage;
