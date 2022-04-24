import React, { useState } from 'react';
import './AddorEditProductText.css';
import downArrow from '../../assets/icons/downArrow.svg';
const AddorEditProductText = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    backgroundStory: '',
    videoLink: '',
    privacy: true,
    gallery: '',
  });

  const [showDropDown, setShowDropDown] = useState(false);

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const DUMMY_GALLERY = [
    'Abstract',
    'Cartoons',
    'Nature',
    'Cars',
    'SkyScapper',
  ];

  return (
    <div className='addOrEditProductText'>
      <div className='addOrEditProductText__inputLabel'>Title:</div>
      <input
        type='text'
        name='title'
        value={formData.title}
        className='addOrEditProductText__inputText'
        onChange={onChangeFormData}
      />
      <div className='addOrEditProductText__inputLabel'>Description:</div>
      <textarea
        name='description'
        value={formData.description}
        onChange={onChangeFormData}
        rows='2'
        type='text'
        placeholder='Not more than 200 letters'
        className='addOrEditProductText__inputText extra__height'
      />
      <div className='addOrEditProductText__inputLabel'>Background Story:</div>
      <textarea
        name='backgroundStory'
        value={formData.backgroundStory}
        onChange={onChangeFormData}
        rows='2'
        type='text'
        placeholder='Not more than 200 letters'
        className='addOrEditProductText__inputText extra__height'
      />
      <div className='addOrEditProductText__inputLabel'>Video Link:</div>
      <input
        type='text'
        name='videoLink'
        value={formData.videoLink}
        onChange={onChangeFormData}
        className='addOrEditProductText__inputText'
      />
      <div className='addOrEditProductText__inputLabel'>Group:</div>
      <div
        className='addOrEditProductText__dropDown'
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}>
        <div className='addOrEditProductText__dropDownText'>
          {formData.gallery ? formData.gallery : 'None Selected'}
        </div>
        <img
          className={
            showDropDown
              ? 'addOrEditProductText__dropDownImage rotate180'
              : 'addOrEditProductText__dropDownImage'
          }
          src={downArrow}
          alt=''
        />
      </div>
      {showDropDown && (
        <div className='addToGallery__dropDown'>
          {DUMMY_GALLERY.map((gallery) => (
            <div
              className='addToGallery__options'
              key={gallery}
              onClick={() => {
                setFormData({ ...formData, gallery: gallery });
                setShowDropDown(!showDropDown);
              }}>
              {gallery}
            </div>
          ))}
        </div>
      )}
      <div className='addOrEditProductText__inputLabel'>Privacy:</div>
      <div
        className='addOrEditProductText__checkbox'
        onClick={() => {
          setFormData({ ...formData, privacy: true });
        }}>
        <div
          className={
            formData.privacy
              ? 'addOrEditProductText__checkboxCircle accent__background'
              : 'addOrEditProductText__checkboxCircle'
          }></div>
        <div className='addOrEditProductText__checkboxText'>Private</div>
      </div>
      <div
        className='addOrEditProductText__checkbox addOrEditProductText__checkboxMarginBottom'
        onClick={() => {
          setFormData({ ...formData, privacy: false });
        }}>
        <div
          className={
            !formData.privacy
              ? 'addOrEditProductText__checkboxCircle accent__background'
              : 'addOrEditProductText__checkboxCircle'
          }></div>
        <div className='addOrEditProductText__checkboxText'>Public</div>
      </div>
      {/*<div className='addOrEditProductText__inputLabel'>
        Price of Original Piece
      </div>
      <div className='addOrEditProductText__smallInputGroup'>
        <input className='addOrEditProductText__smallInput' type='text' />
        <div className='addOrEditProductText__smallInputText'>USD</div>
      </div>
      <div className='addOrEditProductText__inputLabel'>
        Price of Certified Copy
      </div>
      <div className='addOrEditProductText__smallInputGroup'>
        <input className='addOrEditProductText__smallInput' type='text' />
        <div className='addOrEditProductText__smallInputText'>USD</div>
  </div>*/}
      <div className='addOrEditProductText__buttonGroup'>
        <div className='addOrEditProductText__cancelButton'>Cancel</div>
        <div className='addOrEditProductText__submitButton'>Add to Gallery</div>
      </div>
    </div>
  );
};

export default AddorEditProductText;
