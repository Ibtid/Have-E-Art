import React, { useState, useRef } from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import './Gallery.css';

const Gallery = (props) => {
  const imageArray = [image, image2, image3, image4];

  const [showSaveButton, setShowSaveButton] = useState(false);

  const [privacy, setPrivacy] = useState(true);

  const [file, setFile] = useState(null);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleImage = async (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
      setShowSaveButton(true);
    }
  };

  const saveImage = () => {
    setShowSaveButton(false);
  };

  const rollBackChange = () => {
    setFile(null);
    setShowSaveButton(false);
  };

  const switchPrivacy = () => {
    setPrivacy(!privacy);
  };

  return (
    <div className='gallery'>
      <div className='gallery__imageContainer'>
        <img
          className='gallery__image'
          src={
            file
              ? URL.createObjectURL(file)
              : imageArray[Math.floor(Math.random() * 3.9)]
          }
        />
        <div className='gallery__options'>
          <div
            className='gallery__optionsTop gallery__button'
            onClick={switchPrivacy}>
            <div>Toggle privacy</div>
            {!privacy && <div>Public</div>}
            {privacy && <div>Private</div>}
          </div>
          {showSaveButton && (
            <div className='gallery__optionsBottom'>
              <div className='gallery__button' onClick={saveImage}>
                Save
              </div>
              <div className='gallery__button' onClick={rollBackChange}>
                Cancel
              </div>
            </div>
          )}
          {!showSaveButton && (
            <div className='gallery__optionsBottom'>
              <div
                className='gallery__button'
                onClick={() => {
                  props.openGallery();
                }}>
                Visit Gallery
              </div>
              <div className='gallery__button' onClick={pickImageHandler}>
                Change Display
              </div>
            </div>
          )}
          <input
            style={{ display: 'none' }}
            ref={filePickerRef}
            type='file'
            className='profile-img__input'
            id='image'
            name='image'
            placeholder='Choose the image'
            accept='.jpg,.png,.jpeg'
            onChange={handleImage}
          />
        </div>
      </div>
      <div className='gallery__text'>
        <div className='gallery__name'>Abstract</div>
        <div className='gallery__totalItems'>Total items: 4</div>
      </div>
    </div>
  );
};

export default Gallery;
