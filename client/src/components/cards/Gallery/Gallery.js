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
import { useNavigate } from 'react-router-dom';

const Gallery = (props) => {
  const { gallery } = props;
  const imageArray = [image, image2, image3, image4];
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore } = useContext(AppContext);
  const [showSaveButton, setShowSaveButton] = useState(false);
  let navigator = useNavigate();

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
    setShowSpinner(true);
    let response = await dispatch(
      actions.changePrivacy,
      { id: gallery._id },
      { privacy: !privacy },
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setShowSpinner(false);
    setPrivacy(!privacy);
  };
  return (
    <div
      className='gallery'
      onClick={() => {
        navigator(`/gallery/${gallery._id}`);
      }}>
      <div className='gallery__imageContainer'>
        <img
          className='gallery__image'
          src={
             gallery.imgUrl
              ? gallery.imgUrl
              : userImg
          }
        />
      </div>
      <div className='gallery__text'>
        <div className='gallery__name'>{gallery.name}</div>
      </div>
    </div>
  );
};

export default Gallery;
