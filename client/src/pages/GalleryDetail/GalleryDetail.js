import React from 'react';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';
import GalleryDetails from '../../components/MyCollection/GalleryDetail/GalleryDetails';

const GalleryDetail = () => {
  return (
    <ComponentWithSideBar>
      <GalleryDetails />
    </ComponentWithSideBar>
  );
};

export default GalleryDetail;
