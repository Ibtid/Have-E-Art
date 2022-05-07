import React, { useState, useRef } from 'react';
import backButton from '../../../assets/icons/backIcon.svg';
import BoughtCard from '../../cards/BoughtCard/BoughtCard';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './GalleryDetails.css';
const GalleryDetails = (props) => {
  const listingart = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  const [isEditMode, setIsEditMode] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [file, setFile] = useState(null);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    console.log(filePickerRef.current);
    filePickerRef.current.click();
  };

  const handleImage = async (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
    }
  };

  const onClickSaveImage = async () => {
    setFile(null);
  };

  const onClickCancelSaveImage = () => {
    setFile(null);
  };

  return (
    <div className='gallery__details'>
      <div className='gallery__detailsButtons'>
        <div className='gallery__backButton'>
          <img src={backButton} />
          Go Back
        </div>
        <div className='gallery__detailsButtons'>
          <div
            className='gallery__EditButton'
            style={{ paddingRight: '1vw' }}
            onClick={() => {
              setPrivacy(!privacy);
            }}>
            {privacy ? 'Public' : 'Private'}
          </div>
          <div
            className='gallery__EditButton'
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}>
            <div>Edit</div>
            <EditIcon style={{ marginLeft: '10px', marginRight: '1vw' }} />
          </div>
        </div>
      </div>

      <div className='gallery__detailsScroll'>
        <div className='gallery__detailsInfo'>
          <div className='gallery__detailsPicture'>
            <img
              className='gallery__detailsImage'
              src={file ? URL.createObjectURL(file) : backButton}
              alt='gallery pic'
            />
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
            <div className='gallery__detailsPictureUpload'>
              {!file && (
                <div className='profile-img-button' onClick={pickImageHandler}>
                  <AddPhotoAlternateIcon
                    style={{ height: '3rem', width: '3rem' }}
                  />
                </div>
              )}
              {file && (
                <div>
                  <span
                    className='profile-img-cancel-button'
                    style={{ marginRight: '1rem' }}
                    onClick={onClickCancelSaveImage}>
                    Cancel
                  </span>
                  <span
                    className='profile-img-save-button'
                    style={{ marginLeft: '1rem' }}
                    onClick={onClickSaveImage}>
                    Save
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='gallery__detailsText'>
            <div className='gallery__detailsTitle'>Abstract</div>
            <textarea
              rows='2'
              className={
                isEditMode
                  ? 'gallery__detailsDescription  profile-edit-border'
                  : 'gallery__detailsDescription'
              }
              placeholder='describe the gallery'
              disabled={!isEditMode}
            />
          </div>
        </div>

        <div className='gallery__detailsCardList'>
          {listingart.map((a) => (
            <BoughtCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
