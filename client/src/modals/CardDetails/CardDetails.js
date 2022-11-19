import React, { useContext, useEffect, useRef, useState } from 'react';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import { AppContext } from '../../hooks/AppContext';
import ReactDOM from 'react-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CardDetails.css';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';

const inputStyle = {
  iconColor: '#c4f0ff',
  color: '#fff',
  fontWeight: '500',
  fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
  fontSize: '16px',
  fontSmoothing: 'antialiased',
  ':-webkit-autofill': {
    color: '#e5e5e5',
  },
  '::placeholder': {
    color: '#e5e5e5',
  },
};

const CardDetails = (props) => {
  const stripe = useStripe();

  const elements = useElements();
  const ref = useRef();
  const [showForm, setShowForm] = useState(true);
  const card = useRef();
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore, setContextStore } = useContext(AppContext);

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

  function handleSubmit() {
    setShowSpinner(true);
    try {
      stripe
        .createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        })
        .then(async (resp) => {
          console.log(resp);
          const response = await dispatch(
            actions.attachPaymentMethod,
            {},
            {
              paymentMethod: resp.paymentMethod,
            },
            contextStore.user.token
          );
          console.log(response);
          setShowSpinner(false);
          setShowForm(false);
          props.closeForm();
        });
    } catch (err) {
      // Handle Error
      console.log(err);
      setShowSpinner(false);
      setShowForm(false);
      props.closeForm();
    }
  }

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
            {/* <div className='cardDetails__title'>Card Details</div> */}
            {/* <div className='cardDetails__label'>Cardholder Name:</div>
              <input
                className='cardDetails__inputBig'
                placeholder='eg. John Doe'
              />
              <div className='cardDetails__label'>Card Number:</div> */}
            <div className='cardDetails__inputGroup'>
              <CardElement
                className='cardDetails__inputBig'
                ref={card}
                options={{
                  style: {
                    base: inputStyle,
                  },
                }}
              />
            </div>
            <div className='cardDetails__button' onClick={handleSubmit}>
              Save Card Details
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('cardDetails')
  );
};

export default CardDetails;
