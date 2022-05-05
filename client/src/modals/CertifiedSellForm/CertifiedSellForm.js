import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import './CertifiedSellForm.css';

const CertifiedSellForm = (props) => {
  const navigate = useNavigate()
  const ref = useRef();
  const {setShowSpinner} = useContext(SpinnerContext)
  const {contextStore, setContextStore} = useContext(AppContext)
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    copies: 0
    })
  const onChangeFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onClickSubmit = async() => {
    setShowSpinner(true)
    const response = await dispatch(actions.createEdition, {eartId: props.id}, {...formData}, contextStore.user.token)
    console.log(response)
    setShowSpinner(false)
    props.closeForm()
    props.fetchEditions()
  }
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setShowForm(false);
        props.closeForm();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showForm]);

  return ReactDOM.createPortal(
    <div
      className='cardDetails'
      onClick={() => {
        setShowForm(true);
      }}>
      <div ref={ref}>
        {showForm && (
          <div
            className='cardDetails__container'
            onClick={() => {
              setShowForm(true);
            }}>
            <div className='cardDetails__label'>Editor title:</div>
            <input
              className='cardDetails__inputBig certifiedSellForm__width '
              placeholder='eg. Abstract'
              name='name'
              value={formData.name}
              onChange = {onChangeFormData}
            />
            <div className='cardDetails__label'>Number of Copies:</div>
            <input
              type={"number"}
              className='cardDetails__inputBig  certifiedSellForm__width'
              placeholder='eg. 100'
              name='copies'
              value={formData.copies}
              onChange={onChangeFormData}
            />
            <div className='cardDetails__label'>Price $:</div>
            <input
              className='cardDetails__inputBig   certifiedSellForm__width'
              placeholder='eg. 10000'
              name='price'
              value={formData.price}
              onChange={onChangeFormData}
            />
            <div
              className='cardDetails__button certifiedSellForm__topMargin '
              onClick={onClickSubmit}>
              Save{' '}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('certifiedSellForm')
  );
};

export default CertifiedSellForm;
