import React from 'react';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';
import Home from '../../components/Home/Home';

const HomePage = () => {
  return (
    <ComponentWithSideBar>
      <Home />
    </ComponentWithSideBar>
  );
};

export default HomePage;
