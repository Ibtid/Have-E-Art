import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './CertifiedSellForm.css';

const CertifiedSellForm = (props) => {
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
            <div className='cardDetails__label'>Editor title:</div>
            <input
              className='cardDetails__inputBig certifiedSellForm__width '
              placeholder='eg. Abstract'
            />
            <div className='cardDetails__label'>Number of Copies:</div>
            <input
              className='cardDetails__inputBig  certifiedSellForm__width'
              placeholder='eg. 100'
            />
            <div className='cardDetails__label'>Price $:</div>
            <input
              className='cardDetails__inputBig   certifiedSellForm__width'
              placeholder='eg. 10000'
            />
            <div
              className='cardDetails__button certifiedSellForm__topMargin '
              onClick={() => {
                props.setListedForSale();
                props.closeForm();
              }}>
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
