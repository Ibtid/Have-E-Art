import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './ChangePassword.css';

import { SpinnerContext } from '../../hooks/SpinnerContext';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import { AppContext } from '../../hooks/AppContext';

const ChangePassword = (props) => {
  const {contextStore}= useContext(AppContext)
  const ref = useRef();
  const [pop, setPop] = useState('pop__up');
  const [showForm, setShowForm] = useState(true);
  const [formData, setformData] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  });
  const { setShowSpinner } = useContext(SpinnerContext);

  const onChangeFormData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClickSubmit = async () => {
    let allErrors = { newPassword: '', oldPassword: '', confirmPassword: '' };

    if (formData.newPassword.length < 6) {
      allErrors = { ...allErrors, newPassword: 'Use atleast 6 characters' };
    }
    if (formData.oldPassword.length < 6) {
      allErrors = { ...allErrors, oldPassword: 'Use atleast 6 characters' };
    }
    if (formData.confirmPassword.length < 6) {
      allErrors = { ...allErrors, confirmPassword: 'Use atleast 6 characters' };
    }
    if (formData.newPassword !== formData.confirmPassword) {
      allErrors = {
        ...allErrors,
        newPassword: 'Password does not match',
        confirmPassword: 'Password does not match',
      };
    }
   
    setErrors(allErrors);
    if (
      allErrors.confirmPassword.length === 0 &&
      allErrors.newPassword.length === 0 &&
      allErrors.oldPassword.length === 0
    ) {
      setShowSpinner(true);
      let response = await dispatch(actions.changePassword, {},{currentPassword: formData.oldPassword, newPassword: formData.newPassword}, contextStore.user.token)
      console.log(response)
      if(response.errors){
        setShowSpinner(false)
        setErrors({
          ...errors,
          oldPassword: response.errors[0].msg
        })
        return
      }
      setShowSpinner(false);
      setPop('pop__down');
      setTimeout(() => {
        props.closeForm();
      }, 300);
    }
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setPop('pop__down');
        setTimeout(() => {
          setShowForm(false);
          props.closeForm();
        }, 300);
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
            className={`cardDetails__container ${pop}`}
            onClick={() => {
              setShowForm(true);
            }}>
            <div className='cardDetails__label'>Old Password</div>
            <input
              className={`cardDetails__inputBig ${
                errors.oldPassword.length > 1 ? 'red__border' : ''
              }`}
              name='oldPassword'
              type='password'
              value={formData.oldPassword}
              onChange={onChangeFormData}
            />
            {errors.oldPassword.length > 1 && (
              <div className='changePassword__error'>{errors.oldPassword}</div>
            )}
            <div className='cardDetails__label'>New Password</div>
            <input
              className={`cardDetails__inputBig ${
                errors.newPassword.length > 1 ? 'red__border' : ''
              }`}
              name='newPassword'
              type='password'
              value={formData.newPassword}
              onChange={onChangeFormData}
            />
            {errors.newPassword.length > 1 && (
              <div className='changePassword__error'>{errors.newPassword}</div>
            )}
            <div className='cardDetails__label'>Confirm Password</div>
            <input
              className={`cardDetails__inputBig ${
                errors.confirmPassword.length > 1 ? 'red__border' : ''
              }`}
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={onChangeFormData}
            />
            {errors.confirmPassword.length > 1 && (
              <div className='changePassword__error'>
                {errors.confirmPassword}
              </div>
            )}
            <div className='newGroup__button'></div>
            <div className='cardDetails__button' onClick={onClickSubmit}>
              Change Password
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('confirmPassword')
  );
};

export default ChangePassword;
