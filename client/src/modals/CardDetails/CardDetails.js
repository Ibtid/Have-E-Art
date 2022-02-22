import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './CardDetails.css';

const CardDetails = (props) => {
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
            <div className='cardDetails__title'>Card Details</div>
            <div className='cardDetails__label'>Cardholder Name:</div>
            <input
              className='cardDetails__inputBig'
              placeholder='eg. John Doe'
            />
            <div className='cardDetails__label'>Card Number:</div>
            <div className='cardDetails__inputGroup'>
              <input className='cardDetails__input' placeholder='xxxx' />
              <input className='cardDetails__input' placeholder='xxxx' />
              <input className='cardDetails__input' placeholder='xxxx' />
              <input className='cardDetails__input' placeholder='xxxx' />
            </div>
            <div className='cardDetails__label'>Expiration Date:</div>
            <div className='cardDetails__inputGroup'>
              <input className='cardDetails__input' placeholder='MM' />
              <input className='cardDetails__input' placeholder='YY' />
            </div>
            <div className='cardDetails__label'>CVV:</div>
            <input className='cardDetails__input' />
            <div className='cardDetails__button'>Save Card Details</div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('cardDetails')
  );
};

export default CardDetails;
