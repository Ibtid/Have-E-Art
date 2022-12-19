import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import './UserName.modal.css';
import '../NewGroup/NewGroup.css';

const UserNameModal = (props) => {
  const ref = useRef();
  const [pop, setPop] = useState('pop__up');
  const [showForm, setShowForm] = useState(true);
  const [formData, setformData] = useState({
    name: '',
  });
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore, setContextStore } = useContext(AppContext);

  const onChangeFormData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClickSubmit = async () => {
    if(formData.name.length > 6){
      props.closeForm(formData.name)
    }
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setPop('pop__down');
        setTimeout(() => {
          if(formData.name.length > 6){
            setShowForm(false);
            props.closeForm(formData.name);
          }
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
      className='userName__modal'
      onClick={() => {
        setShowForm(true);
      }}>
      <div ref={ref}>
        {true && (
          <div
            className={`cardDetails__container ${pop}`}
            onClick={() => {
              setShowForm(true);
            }}>
            <div className='cardDetails__label'>User Name:</div>
            <input
              className='cardDetails__inputBig'
              placeholder='eg. Abstract'
              name='name'
              value={formData.name}
              onChange={onChangeFormData}
            />
            <div className='newGroup__button'></div>
            <div className='cardDetails__button' onClick={onClickSubmit}>
              Add
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('userName__Modal')
  );
};

export default UserNameModal;
