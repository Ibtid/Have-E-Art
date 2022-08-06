import React from 'react';
import image1 from '../../../assets/icons/avatar.svg';
import './UserCard.css';
const UserCard = () => {
  return (
    <div className='userCard__container'>
      <div className='userCard__imageContainer'>
        <img className='userCard__image' src={image1} alt='user' />
      </div>
      <div className='userCard__textContainer'>
        <div className='userCard__Name'>Ibtid Rahman</div>
        <div className='userCard__OwnedArts'>Followers: 236</div>
      </div>
    </div>
  );
};

export default UserCard;
