import React, { useContext, useEffect, useState } from 'react';

import './UserProfile.css';

import userImg from '../../assets/icons/avatar.svg';
import fb from '../../assets/icons/fb.svg';
import web from '../../assets/icons/web.svg';
import instagram from '../../assets/icons/instagram.svg';
import pinterest from '../../assets/icons/pinterest.svg';
import ProfileShowCase from './ProfileShowCase';
import { useNavigate, useParams } from 'react-router-dom';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import checkIfOwner from '../../utility/checkIfOwner';
import { AppContext } from '../../hooks/AppContext';
import MessagePrompt from '../../modals/MessagePrompt/MessagePrompt';

const UserProfile = (props) => {
  const [user, setUser] = useState({
    socialLinks: {},
    followers: [],
  });
  const navigate = useNavigate();
  const [openMessagePrompt, setOpenMessagePrompt] = useState(false);
  const { contextStore } = useContext(AppContext);
  const { id } = useParams();
  const { setShowSpinner } = useContext(SpinnerContext);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      let response = await dispatch(actions.getUserProfile, { id }, {});
      console.log(response);
      if (response.errors) {
        setShowSpinner(false);
        return;
      }
      setUser(response);
      setShowSpinner(false);
    })();
  }, []);
  const onClickFollow = async () => {
    setShowSpinner(true);
    let response = await dispatch(
      actions.followUser,
      { id },
      {},
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setUser(response);
    setShowSpinner(false);
  };
  const onClickUnfollow = async () => {
    setShowSpinner(true);
    let response = await dispatch(
      actions.unfollowUser,
      { id },
      {},
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setUser(response);
    setShowSpinner(false);
  };
  const onClickSendMessage = async () => {
    setShowSpinner(true)
    let response = await dispatch(actions.roomExists, {userId: id}, {}, contextStore.user.token)
    console.log(response)
    setShowSpinner(false)
    if(response.exists){
      return navigate(`/messages/${response._id}`)
    }
    setOpenMessagePrompt(true)
    // setShowSpinner(true);
    // let response = await dispatch(
    //   actions.createRoom,
    //   {},
    //   { user: { _id: id } },
    //   contextStore.user.token
    // );
    // console.log(response);
    // setShowSpinner(false);
    // if (!response.errors) {
    //   navigate(`/messages/${response._id}`);
    // }
  };

  const onClickOpenMessagePrompt = () => {
    setOpenMessagePrompt(true);
  };

  return (
    <>
      {openMessagePrompt && (
        <MessagePrompt
          closeForm={() => {
            setOpenMessagePrompt(false);
            
          }}
        />
      )}
      <div className='profile noScrollBar'>
        <div className='profile-head-section'>
          <div className='profile-heading'>Profile</div>
        </div>
        <div className='user-grid'>
          <div className='profile-img-section'>
            <div className='profile-img-back'>
              <img
                className='profile-img'
                src={user.profileImage ? user.profileImage : userImg}
                alt='img'
              />
            </div>
          </div>
          <div className='user-info'>
            <div className='userInfo__nameAndButtons'>
              <div className='userInfo__name'>
                {user.firstName} {user.lastName}
              </div>

              {contextStore.user && !checkIfOwner(contextStore, id) && (
                <div className='userInfo__buttonGroup'>
                  {user.followers.includes(contextStore.user._id) ? (
                    <div
                      className='userInfo__accentButton'
                      onClick={onClickUnfollow}>
                      Following
                    </div>
                  ) : (
                    <div
                      className='userInfo__accentButton'
                      onClick={onClickFollow}>
                      Follow
                    </div>
                  )}

                  <div
                    className='userInfo__accentOutLine'
                    onClick={onClickSendMessage}>
                    Send Message
                  </div>
                </div>
              )}
            </div>
            <div className='profile-username-accent'>{user.userName}</div>
            <div className='profile-user-bio'>{user.bio}</div>
          </div>
          <div className='profile-contact'>
            <div className='profile-contact-info'>
              <img className='profile-contact-info-icon' src={fb} alt='fb' />
              <div className='profile-contact-info-text'>
                {user.socialLinks.facebook}
              </div>
            </div>
            <div className='profile-contact-info'>
              <img className='profile-contact-info-icon' src={web} alt='web' />
              <div className='profile-contact-info-text'>
                {user.socialLinks.twitter}
              </div>
            </div>
            <div className='profile-contact-info'>
              <img
                className='profile-contact-info-icon'
                src={instagram}
                alt='instagram'
              />
              <div className='profile-contact-info-text'>
                {user.socialLinks.instagram}
              </div>
            </div>
            <div className='profile-contact-info'>
              <img
                className='profile-contact-info-icon'
                src={pinterest}
                alt='pinterest'
              />
              <div className='profile-contact-info-text'>
                {user.socialLinks.pinterest}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className='user-grid-section2'>
          <div className='user-text-grey'>{user.email}</div>
          <div className='user-sub-heading'>E-arts</div>

          <ProfileShowCase>{props.children}</ProfileShowCase>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
