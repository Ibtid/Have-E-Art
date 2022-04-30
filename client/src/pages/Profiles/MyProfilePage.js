import React from 'react';
import MyProfile from '../../components/Profiles/MyProfile';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';

const MyProfilePage = () => {
  return (
    <ComponentWithSideBar>
      <MyProfile />
    </ComponentWithSideBar>
  );
};

export default MyProfilePage;
