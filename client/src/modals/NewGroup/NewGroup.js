import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './NewGroup.css';

const NewGroup = (props) => {
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);

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
            />
            <div className='newGroup__button'></div>
            <div className='cardDetails__button'>Add New Gallery</div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('newGroup')
  );
};

export default NewGroup;
