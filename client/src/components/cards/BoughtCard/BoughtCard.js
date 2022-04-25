import React from 'react';
import image from '../../../assets/images/pexels-dan-cristian-pădureț-1193743 1.png';
import image2 from '../../../assets/images/pexels-jane-pham-1571673.jpg';
import image3 from '../../../assets/images/pexels-vincent-pelletier-908713.jpg';
import image4 from '../../../assets/images/pexels-ayswarya-aish-2109147.jpg';
import './BoughtCard.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';

const BoughtCard = ({eart}) => {
  const imageArray = [image, image2, image3, image4];
  const { contextStore, setContextStore } = useContext(AppContext);
  let navigator = useNavigate();

  return (
    <div
      to='/product/1'
      className='boughtCard'
      onClick={() => {

        setContextStore({...contextStore, owner: true, eart});


        navigator('/product/1');
      }}>
      <div className='bought__imageContainer'>
        <img
          className='bought__image'
          src={eart.imgUrl}
          alt='art'
        />
      </div>
      <div className='bought__description'>
        <div className='bought__rowOne'>
          <div className='bought__title'>{eart.title}</div>
        </div>
        <div className='bought__rowTwo'>uploaded at {new Date(eart.uploadDate).getDate()}th {new Date(eart.uploadDate).toLocaleString("default", {month: "long"})}, {new Date(eart.uploadDate).getFullYear()}</div>
        <div className='bought__rowThree'>
          <div className='bought__created'>
            <span>Created by :</span>
            <span className='productShowcaseCard__name'>{eart.creator.firstName } {eart.creator.lastName}</span>
          </div>
          <div className='bought__type'>Type: Original</div>
          <div className='bought__owned'>
            <span>Owned by:</span>
            <span className='productShowcaseCard__name'>{eart.owner.firstName } {eart.owner.lastName}</span>
          </div>
          <div className='bought__format'>Format: {eart.format}</div>
        </div>
      </div>
    </div>
  );
};

export default BoughtCard;
