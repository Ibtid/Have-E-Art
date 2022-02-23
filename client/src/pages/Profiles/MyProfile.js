import React from 'react';
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

const MyProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (e) => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className='profile'>
      {showForm && (
        <CardDetails
          closeForm={() => {
            setShowForm(false);
          }}
        />
      )}
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
            <img className='profile-img' src={userImg} alt='img' />
          </div>
        </div>
        <div className='profile-info'>
          <div
            className={
              isEditMode
                ? 'profile-fullname-white profile-edit-border hide'
                : 'profile-fullname-white'
            }>
            Nafiz Imtiaz
          </div>
          <input
            className={
              isEditMode
                ? 'profile-fullname-white profile-edit-border'
                : 'profile-fullname-white hide'
            }
            type='text'
            value='Sananda'
          />
          <div
            className={
              isEditMode
                ? 'profile-username-accent profile-edit-border hide'
                : 'profile-username-accent'
            }>
            sananda05
          </div>
          <input
            className={
              isEditMode
                ? 'profile-username-accent profile-edit-border'
                : 'profile-username-accent hide'
            }
            type='text'
            value='sananda05'
          />
          <div
            className={
              isEditMode
                ? 'profile-user-bio profile-edit-border hide'
                : 'profile-user-bio'
            }>
            By developing ideas with my clients and adapting new content to
            their needs, which sometimes involves combining 3D, videos, and
            photos, I like to call myself – a content creator.
          </div>
          <textarea
            rows='2'
            className={
              isEditMode
                ? 'profile-user-bio profile-edit-border user-bio-margin'
                : 'profile-user-bio hide'
            }
            value='By developing ideas with my clients and adapting new content to their needs, which sometimes involves combining 3D,videos, and photos, I like to call myself a content creator.'
          />
        </div>
        <div className='profile-contact'>
          <div className='profile-contact-info'>
            <img className='profile-contact-info-icon' src={fb} alt='fb' />
            <div className='profile-contact-info-text'>sananda05</div>
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
            <div className='profile-contact-info-text'>www.nafizimtiaz.com</div>
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
            <div className='profile-contact-info-text'>nafiz6969</div>
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
            <div className='profile-contact-info-text'>mafizimt29</div>
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
          <div
            className={
              isEditMode
                ? 'profile-text-grey profile-edit-border hide'
                : 'profile-text-grey'
            }>
            nafizimtiaz@gmail.com
          </div>
          <input
            className={
              isEditMode
                ? 'profile-text-grey profile-edit-border'
                : 'profile-text-grey hide'
            }
            type='text'
            value='nafizimtiaz@gmail.com'
          />
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
          <div className='profile-cancel-button' onClick={handleEdit}>
            Cancel
          </div>
          <div className='profile-save-button'>Save</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
