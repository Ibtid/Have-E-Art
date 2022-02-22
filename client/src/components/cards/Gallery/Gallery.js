import React from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import './Gallery.css';

const Gallery = (props) => {
  const imageArray = [image, image2, image3, image4];
  return (
    <div
      className='gallery'
      onClick={() => {
        props.openGallery();
      }}>
      <div className='gallery__imageContainer'>
        <img
          className='gallery__image'
          src={imageArray[Math.floor(Math.random() * 3.9)]}
        />
      </div>
      <div className='gallery__text'>
        <div className='gallery__name'>Abstract</div>
        <div className='gallery__totalItems'>Total items: 4</div>
      </div>
    </div>
  );
};

export default Gallery;
