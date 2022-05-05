import React from 'react';
import UserProfile from '../../components/Profiles/UserProfile';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';

const UserProfilePage = (props) => {
  return (
    <ComponentWithSideBar>
      <UserProfile>{props.children}</UserProfile>
    </ComponentWithSideBar>
  );
};

export default UserProfilePage;
