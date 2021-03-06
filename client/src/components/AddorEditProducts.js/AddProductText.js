import React, { useContext, useEffect, useState } from 'react';
import './AddProductText.css';
import downArrow from '../../assets/icons/downArrow.svg';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import { AppContext } from '../../hooks/AppContext';
import { useNavigate } from 'react-router-dom';
import Spinkit from '../../modals/Spinkit/Spinkit';
import { SpinnerContext } from '../../hooks/SpinnerContext';

const AddProductText = (props) => {
  const {setShowSpinner} = useContext(SpinnerContext)
  const navigate = useNavigate();
  const { contextStore, setContextStore } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    backgroundStory: '',
    videoLink: '',
    privacy: true,
    gallery: null,
  });
  const [galleries, setGalleries] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClickSubmit = async () => {
    console.log(formData);
    setShowSpinner(true)
    if (!props.image) {
      alert('please add image');
      setShowSpinner(false)
      return;
    }
    let data = new FormData();
    for (const props in formData) {
      if (props == 'gallery') {
        data.append(props, JSON.stringify(formData[props]));
      } else {
        data.append(props, formData[props]);
      }
    }
    data.append('image', props.image, props.image.name);
    const response = await dispatch(
      actions.addEArt,
      {},
      data,
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      alert(response.errors[0].msg);
      setShowSpinner(false)
      return;
    }
    navigate(-1);
  };
  useEffect(() => {
    (async () => {
      const response = await dispatch(
        actions.getGalleries,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        return;
      }
      setGalleries(response);
    })();
  }, []);

  return (
    <div className='addOrEditProductText'>
      <div className='addOrEditProductText__inputLabel'>Title:</div>
      <input
        type='text'
        name='title'
        value={formData.title}
        className='addOrEditProductText__inputText'
        onChange={onChangeFormData}
      />
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
      <div className='addOrEditProductText__inputLabel'>Background Story:</div>
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

      <div className='addOrEditProductText__buttonGroup'>
        <div
          className='addOrEditProductText__cancelButton'
          onClick={() => {
            navigate('/MyCollection');
          }}>
          Cancel
        </div>
        <div
          className='addOrEditProductText__submitButton'
          onClick={onClickSubmit}>
          Add to Gallery
        </div>
      </div>
    </div>
  );
};

export default AddProductText;
