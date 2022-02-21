import React from 'react';
import './AddorEditProductText.css';
import downArrow from '../../assets/icons/downArrow.svg';
const AddorEditProductText = () => {
  return (
    <div className='addOrEditProductText'>
      <div className='addOrEditProductText__inputLabel'>Title:</div>
      <input type='text' className='addOrEditProductText__inputText' />
      <div className='addOrEditProductText__inputLabel'>Description:</div>
      <textarea
        rows='2'
        type='text'
        placeholder='Not more than 200 letters'
        className='addOrEditProductText__inputText extra__height'
      />
      <div className='addOrEditProductText__inputLabel'>Background Story:</div>
      <textarea
        rows='2'
        type='text'
        placeholder='Not more than 200 letters'
        className='addOrEditProductText__inputText extra__height'
      />
      <div className='addOrEditProductText__inputLabel'>Video Link:</div>
      <input type='text' className='addOrEditProductText__inputText' />
      <div className='addOrEditProductText__inputLabel'>Group:</div>
      <div className='addOrEditProductText__dropDown'>
        <div className='addOrEditProductText__dropDownText'>None Selected</div>
        <img
          className='addOrEditProductText__dropDownImage'
          src={downArrow}
          alt=''
        />
      </div>
      <div className='addOrEditProductText__inputLabel'>Privacy:</div>
      <div className='addOrEditProductText__checkbox'>
        <div className='addOrEditProductText__checkboxCircle'></div>
        <div className='addOrEditProductText__checkboxText'>Private</div>
      </div>
      <div className='addOrEditProductText__checkbox addOrEditProductText__checkboxMarginBottom'>
        <div className='addOrEditProductText__checkboxCircle'></div>
        <div className='addOrEditProductText__checkboxText'>Public</div>
      </div>
      <div className='addOrEditProductText__inputLabel'>
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
      </div>
      <div className='addOrEditProductText__buttonGroup'>
        <div className='addOrEditProductText__cancelButton'>Cancel</div>
        <div className='addOrEditProductText__submitButton'>Add to Gallery</div>
      </div>
    </div>
  );
};

export default AddorEditProductText;
