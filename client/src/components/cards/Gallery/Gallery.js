import React, { useState, useRef, useContext } from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import './Gallery.css';
import userImg from '../../../assets/icons/avatar.svg';
import { SpinnerContext } from '../../../hooks/SpinnerContext';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';
import { AppContext } from '../../../hooks/AppContext';

const Gallery = (props) => {
  const {gallery} = props
  const imageArray = [image, image2, image3, image4];
  const {setShowSpinner} = useContext(SpinnerContext)
  const {contextStore} = useContext(AppContext)
  const [showSaveButton, setShowSaveButton] = useState(false);

  const [privacy, setPrivacy] = useState(gallery.private);

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

  const switchPrivacy = async () => {
    setShowSpinner(true)
    let response = await dispatch(actions.changePrivacy, {id: gallery._id}, {privacy: !privacy},contextStore.user.token)
    console.log(response)
    if(response.errors){
      setShowSpinner(false)
      return
    }
    setShowSpinner(false)
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
              : gallery.imgUrl
              ? gallery.imgUrl:
              userImg
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
      </div>
    </div>
  );
};

export default Gallery;
