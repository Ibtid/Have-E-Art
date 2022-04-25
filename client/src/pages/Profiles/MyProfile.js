import React, { useContext, useEffect, useRef } from 'react';
import './MyProfile.css';

import { useState } from 'react';

import userImg from '../../assets/icons/avatar.svg';
import fb from '../../assets/icons/fb.svg';
import web from '../../assets/icons/web.svg';
import instagram from '../../assets/icons/instagram.svg';
import pinterest from '../../assets/icons/pinterest.svg';
import edit from '../../assets/icons/edit.svg';
import cancel from '../../assets/icons/cancel.svg';

import CardDetails from '../../modals/CardDetails/CardDetails';
import { AppContext } from '../../hooks/AppContext';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { useNavigate } from 'react-router-dom';
import Spinkit from '../../modals/Spinkit/Spinkit';

const MyProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { contextStore, setContextStore } = useContext(AppContext);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    setIsEditMode(!isEditMode);
  };
  const [showSpinner, setShowSpinner] = useState(false);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  const [file, setFile] = useState(null);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleImage = async (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
    }
  };

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeSocialLinks = (e) => {
    const { socialLinks } = formData;
    socialLinks[e.target.name] = e.target.value;
    setFormData({ ...formData, socialLinks });
  };

  const onClickSubmit = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.editProfile,
      {},
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        socialLinks: formData.socialLinks,
      },
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      console.log(response.errors);
      navigate('/profile');
      return;
    }
    const user = { ...response, token: contextStore.user.token };
    setContextStore({ ...contextStore, user });
    localStorage.setItem('user', JSON.stringify(user));
    setFormData(JSON.parse(localStorage.getItem('user')));
    handleEdit();
    setShowSpinner(false);
  };

  const onClickCancel = () => {
    setFormData(JSON.parse(localStorage.getItem('user')));
    handleEdit();
  };
  const onClickSaveImage = async() => {
    setShowSpinner(true)
    const data = new FormData()
    data.append("image", file, file.name)
    const response = await dispatch(actions.uploadProfileImage, {}, data, contextStore.user.token)
    console.log(response)
    if(response.errors){
      return
    }
    const user = { ...response, token: contextStore.user.token };
    setContextStore({ ...contextStore, user });
    localStorage.setItem('user', JSON.stringify(user));
    setFile(null)
    setShowSpinner(false)
  }
  const onClickCancelSaveImage = () => {
    console.log(file)
    setFile(null)
  }

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // }, [file]);

  return (
    <div className='profile'>
      {showForm && (
        <CardDetails
          closeForm={() => {
            setShowForm(false);
          }}
        />
      )}
      {showSpinner && <Spinkit />}
      <div className='profile-head-section'>
        <div className='profile-heading'>Profile</div>
        <div
          className={
            isEditMode ? 'profile-edit profile-edit-mode' : 'profile-edit'
          }
          onClick={handleEdit}>
          <img className='profile-edit-icon' src={edit} alt='edit' />
          <div className='profile-edit-button'>Edit profile</div>
        </div>
      </div>
      <div className='profile-grid'>
        <div className='profile-img-section'>
          <div className='profile-img-back'>
            <img
              className='profile-img'
              src={file ? URL.createObjectURL(file) : contextStore.user.profileImage ? contextStore.user.profileImage : userImg}
              alt='img'
            />
            <div className='profile-img-upload-button'>
              <div className='profile-img-button' onClick={pickImageHandler}>
                Upload Image
              </div>
            </div>
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
        {file &&<div className='profile-cancel-button' onClick={onClickCancelSaveImage}>
            Cancel
          </div>
          }
        {file && <div className='profile-save-button' onClick={onClickSaveImage}>
            Save
          </div>}

        <div className='profile-info'>
          <div
            className={
              isEditMode
                ? 'profile-fullname-white profile-edit-border hide'
                : 'profile-fullname-white'
            }>
            {formData.firstName} {formData.lastName}
          </div>
          <div className={isEditMode ? 'profile__Name' : 'hide'}>
            <input
              className={
                isEditMode
                  ? 'profile-fullname-white minimizeWidth profile-edit-border '
                  : 'profile-fullname-white hide'
              }
              type='text'
              name='firstName'
              onChange={onChangeFormData}
              value={formData.firstName}
            />

            <input
              className={
                isEditMode
                  ? 'profile-fullname-white minimizeWidth profile-edit-border'
                  : 'profile-fullname-white hide'
              }
              name='lastName'
              onChange={onChangeFormData}
              value={formData.lastName}
            />
          </div>
          <div className='profile-username-accent'>{formData.userName}</div>

          <textarea
            placeholder='Put In Your Bio Here'
            rows='2'
            className={
              isEditMode
                ? 'profile-user-bio profile-edit-border user-bio-margin'
                : 'profile-user-bio '
            }
            name='bio'
            onChange={onChangeFormData}
            value={formData.bio}
            disabled={!isEditMode}
          />
        </div>
        <div className='profile-contact'>
          <div className='profile-contact-info'>
            <img className='profile-contact-info-icon' src={fb} alt='fb' />
            <input
              name='facebook'
              placeholder='Add your Facebook Link here'
              onChange={onChangeSocialLinks}
              className={
                isEditMode
                  ? 'profile-contact-info-text social__input'
                  : 'profile-contact-info-text'
              }
              disabled={!isEditMode}
              value={formData.socialLinks.facebook}
            />
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
          <div className='profile-contact-info'>
            <img className='profile-contact-info-icon' src={web} alt='web' />

            <input
              name='twitter'
              onChange={onChangeSocialLinks}
              placeholder='Add your twitter link here'
              className={
                isEditMode
                  ? 'profile-contact-info-text social__input'
                  : 'profile-contact-info-text'
              }
              disabled={!isEditMode}
              value={formData.socialLinks.twitter}
            />
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
          <div className='profile-contact-info'>
            <img
              className='profile-contact-info-icon'
              src={instagram}
              alt='instagram'
            />

            <input
              name='instagram'
              onChange={onChangeSocialLinks}
              placeholder='Add your instagram link here'
              className={
                isEditMode
                  ? 'profile-contact-info-text social__input'
                  : 'profile-contact-info-text'
              }
              disabled={!isEditMode}
              value={formData.socialLinks.instagram}
            />
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
          <div className='profile-contact-info'>
            <img
              className='profile-contact-info-icon'
              src={pinterest}
              alt='pinterest'
            />

            <input
              name='pinterest'
              onChange={onChangeSocialLinks}
              placeholder='Add your pinterest link here'
              className={
                isEditMode
                  ? 'profile-contact-info-text social__input'
                  : 'profile-contact-info-text'
              }
              disabled={!isEditMode}
              value={formData.socialLinks.pinterest}
            />
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
        </div>
      </div>
      <br />
      <div className='profile-grid-section2'>
        <div>
          <div className='profile-sub-heading'>Email</div>
          <div className='profile-text-grey'>{formData.email}</div>

          <div className='profile-sub-heading'>Credetial information:</div>
          <div className='profile-payment-option'>
            <div className='profile-option-text-grey'>
              1. VISA **** **** **** 2139
            </div>
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
          <div className='profile-payment-option'>
            <div className='profile-option-text-grey'>
              2. Master Card **** **** **** 2139
            </div>
            <img
              className={
                isEditMode
                  ? 'profile-contact-info-icon'
                  : 'profile-contact-info-icon profile-edit-mode'
              }
              src={cancel}
              alt='c'
            />
          </div>
          <br />
          <div
            className='profile-add-button'
            onClick={() => {
              setShowForm(true);
            }}>
            <div className='profile-add-button-sign'>+</div>
            <div className='profile-add-button-text'>Add New</div>
          </div>
        </div>
        <div
          className={
            isEditMode
              ? 'profile-button-group'
              : 'profile-button-group profile-edit-mode'
          }>
          <div className='profile-cancel-button' onClick={onClickCancel}>
            Cancel
          </div>
          <div className='profile-save-button' onClick={onClickSubmit}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
