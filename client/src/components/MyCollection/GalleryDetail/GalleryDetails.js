import React, { useState, useRef, useEffect, useContext } from 'react';
import backButton from '../../../assets/icons/backIcon.svg';
import BoughtCard from '../../cards/BoughtCard/BoughtCard';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './GalleryDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';
import { AppContext } from '../../../hooks/AppContext';
import { SpinnerContext } from '../../../hooks/SpinnerContext';
import ProductShowcaseCard from '../../cards/ProductShowcaseCard/ProductShowcaseCard';
import checkIfOwner from '../../../utility/checkIfOwner';
const GalleryDetails = (props) => {
  const { id } = useParams();
  const { contextStore } = useContext(AppContext);
  const { setShowSpinner } = useContext(SpinnerContext);
  const [gallery, setGallery] = useState({ owner: {} });
  const [earts, setEarts] = useState([]);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const onChangeFormData = (e) => {
    console.log(gallery);
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
    setShowSpinner(true);
    const data = new FormData();
    data.append('image', file, file.name);
    let response = await dispatch(
      actions.uploadGalleryImage,
      { id },
      data,
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setGallery(response);
    setShowSpinner(false);
    setFile(null);
  };

  const onClickCancelSaveImage = () => {
    setFile(null);
  };
  const onClickSubmit = async () => {
    setShowSpinner(true);
    let response = await dispatch(
      actions.editGallery,
      { id },
      formData,
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setGallery(response);
    setFormData({
      description: response.description,
      private: response.private,
    });
    setIsEditMode(!isEditMode);
    setShowSpinner(false);
  };
  const onClickCancelSubmit = () => {
    setFormData({
      description: gallery.description,
      private: gallery.private,
    });
    setIsEditMode(!isEditMode);
  };
  useEffect(() => {
    if (contextStore.user) {
      (async () => {
        setShowSpinner(true);
        let response = await dispatch(
          actions.getGallery,
          { id },
          {},
          contextStore.user.token
        );
        console.log(response);
        if (response.errors) {
          setShowSpinner(false);
          return;
        }
        setGallery(response);
        setFormData({
          description: response.description,
          private: response.private,
        });
        response = await dispatch(
          actions.getGalleryEarts,
          { id },
          {},
          contextStore.user.token
        );
        console.log(response);
        if (response.errors) {
          setShowSpinner(false);
          return;
        }
        setEarts(response);
        setShowSpinner(false);
      })();
    }
  }, [contextStore.user]);
  return (
    <div className='gallery__details'>
      <div className='gallery__detailsButtons'>
        <div
          className='gallery__backButton'
          onClick={() => {
            navigate(-1);
          }}>
          <img src={backButton} />
          Go Back
        </div>

        {checkIfOwner(contextStore, gallery.owner._id) && (
          <div
            className='gallery__EditButton'
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}>
            <div>Edit</div>
            <EditIcon
              style={{
                marginLeft: '10px',
                marginRight: '1vw',
              }}
            />
          </div>
        )}
      </div>

      {gallery.name && (
        <div className='gallery__detailsScroll'>
          <div className='gallery__detailsInfo fadeIn'>
            <div className='gallery__detailsPicture'>
              <img
                className='gallery__detailsImage'
                src={
                  file
                    ? URL.createObjectURL(file)
                    : gallery.imgUrl
                    ? gallery.imgUrl
                    : backButton
                }
                alt='gallery pic'
              />
              {checkIfOwner(contextStore, gallery.owner._id) && (
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
              )}
              {checkIfOwner(contextStore, gallery.owner._id) && (
                <div className='gallery__detailsPictureUpload'>
                  {!file && (
                    <div
                      className='profile-img-button'
                      onClick={pickImageHandler}>
                      <AddPhotoAlternateIcon
                        style={{
                          height: '3rem',
                          width: '3rem',
                        }}
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
              )}
            </div>
            <div className='gallery__detailsText'>
              <div className='gallery__detailsTextFirstRow'>
                <div className='gallery__detailsTitle'>{gallery.name}</div>
                {isEditMode ? (
                  <div
                    className='gallery__EditButton accentButton'
                    style={{ paddingRight: '1vw' }}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        private: !formData.private,
                      });
                    }}>
                    {!formData.private ? 'Public' : 'Private'}
                  </div>
                ) : (
                  <div
                    className='gallery__EditButton'
                    style={{ paddingRight: '1vw' }}>
                    {!formData.private ? 'Privacy: Public' : 'Privacy: Private'}
                  </div>
                )}
              </div>
              <textarea
                rows='2'
                className={
                  isEditMode
                    ? 'gallery__detailsDescription  profile-edit-border'
                    : 'gallery__detailsDescription'
                }
                placeholder='describe the gallery'
                name='description'
                value={formData.description}
                onChange={onChangeFormData}
                disabled={!isEditMode}
              />
              {isEditMode && (
                <div style={{ marginTop: '1rem' }}>
                  <span
                    className='profile-img-cancel-button'
                    style={{ marginRight: '1rem' }}
                    onClick={onClickCancelSubmit}>
                    Cancel
                  </span>
                  <span
                    className='profile-img-save-button'
                    style={{ marginLeft: '1rem' }}
                    onClick={onClickSubmit}>
                    Save
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='gallery__detailsEartTitle'>E-Arts</div>
          <div className='gallery__detailsCardList'>
            {earts.map((eart) => (
              <ProductShowcaseCard eart={eart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetails;
