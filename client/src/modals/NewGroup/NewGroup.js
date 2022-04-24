import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import './NewGroup.css';

const NewGroup = (props) => {
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);
  const [formData, setformData] = useState({
    name: ""
  })
  const {contextStore, setContextStore} = useContext(AppContext)
  const onChangeFormData=(e) => {
    setformData({...formData, [e.target.name]:e.target.value})
  }
  const onClickSubmit = async () => {
    const response = await dispatch(actions.addGallery, {}, formData, contextStore.user.token)
    console.log(response)
    if(response.errors){
      alert(response.errors[0].msg)
      return
    }
    props.closeForm()
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
            <div className='cardDetails__label'>Gallery Name:</div>
            <input
              className='cardDetails__inputBig'
              placeholder='eg. Abstract'
              name='name'
              value={formData.name}
              onChange={onChangeFormData}
            />
            <div className='newGroup__button'></div>
            <div className='cardDetails__button' onClick={onClickSubmit}>Add New Gallery</div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('newGroup')
  );
};

export default NewGroup;
