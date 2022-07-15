import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import downArrow from '../../assets/icons/downArrow.svg';
import { AppContext } from '../../hooks/AppContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import { SpinnerContext } from '../../hooks/SpinnerContext';

const EditProductText = ({ eart }) => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(AppContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [formData, setFormData] = useState({});
  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClickSubmit = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.editEart,
      { id: eart._id },
      formData,
      contextStore.user.token
    );
    setShowSpinner(false);
    console.log(response);
    if (response.errors) {
      return;
    }
    await navigate(-1);
  };
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const response = await dispatch(
        actions.getGalleries,
        {},
        {},
        contextStore.user.token
      );
      setShowSpinner(false);
      console.log(response);
      if (response.errors) {
        return;
      }
      setGalleries(response);
    })();
  }, []);
  useEffect(() => {
    setFormData({
      description: eart.description,
      backgroundStory: eart.backgroundStory,
      videoLink: eart.videoLink,
      privacy: eart.flag.private,
      gallery: eart.gallery,
      price: eart.price,
    });
  }, [eart]);
  return (
    <>
      {eart.title && (
        <div className='addOrEditProductText fadeIn'>
          <div className='addOrEditProductText__inputLabel'>Title:</div>
          <div className='addOrEditProductText__title'>{eart.title}</div>
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
          <div className='addOrEditProductText__inputLabel'>
            Background Story:
          </div>
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
          <div className='addOrEditProductText__inputLabel'>Gallery:</div>
          <div
            className='addOrEditProductText__dropDown'
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}>
            <div className='addOrEditProductText__dropDownText'>
              {formData.gallery ? formData.gallery.name : 'None Selected'}
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
              {galleries.map((gallery) => (
                <div
                  className='addToGallery__options'
                  key={gallery._id}
                  onClick={() => {
                    console.log(gallery);
                    setFormData({ ...formData, gallery: gallery });
                    setShowDropDown(!showDropDown);
                  }}>
                  {gallery.name}
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
          <div className='addOrEditProductText__inputLabel'>
            Price of Original Piece
          </div>
          <div className='addOrEditProductText__smallInputGroup'>
            <input
              className='addOrEditProductText__smallInput'
              type='number'
              name='price'
              value={formData.price}
              onChange={onChangeFormData}
            />
            <div className='addOrEditProductText__smallInputText'>USD</div>
          </div>
          <div className='addOrEditProductText__buttonGroup'>
            <div
              className='addOrEditProductText__cancelButton'
              onClick={() => {
                navigate(-1);
              }}>
              Cancel
            </div>
            <div
              className='addOrEditProductText__submitButton'
              onClick={onClickSubmit}>
              Edit E-art
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductText;
