import React from 'react';
import image1 from '../../../assets/icons/avatar.svg';
import './UserCard.css';
const UserCard = ({user}) => {
  return (
    <div className='userCard__container'>
      <div className='userCard__imageContainer'>
        <img className='userCard__image' src={user.profileImage ? user.profileImage : image1} alt='user' />
      </div>
      <div className='userCard__textContainer'>
        <div className='userCard__Name'>{user.firstName +" " + user.lastName}</div>
        <div className='userCard__OwnedArts'>Followers: {user.followers.length}</div>
      </div>
    </div>
  );
};

export default UserCard;
