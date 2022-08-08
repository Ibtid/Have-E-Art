import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { SpinnerContext } from '../../hooks/SpinnerContext';

const ChangePassword = (props) => {
  const ref = useRef();
  const [pop, setPop] = useState('pop__up');
  const [showForm, setShowForm] = useState(true);
  const [formData, setformData] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  });
  const { setShowSpinner } = useContext(SpinnerContext);

  const onChangeFormData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClickSubmit = async () => {
    if (formData.newPassword) {
      setShowSpinner(true);
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
              className='cardDetails__inputBig'
              name='oldPassword'
              type='password'
              value={formData.oldPassword}
              onChange={onChangeFormData}
            />
            <div className='cardDetails__label'>New Password</div>
            <input
              className='cardDetails__inputBig'
              name='newPassword'
              type='password'
              value={formData.newPassword}
              onChange={onChangeFormData}
            />
            <div className='cardDetails__label'>Confirm Password</div>
            <input
              className='cardDetails__inputBig'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={onChangeFormData}
            />
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
