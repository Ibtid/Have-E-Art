import React, { useContext, useEffect, useRef, useState } from 'react';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import ReactDOM from 'react-dom';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import './CardDetails.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51HZDOcHKFvH5Oe64NcisIbwlEP1GXpFzpIWKhNeM6Qj6rgbFsHfxwJNFHyFXXtkfSosJZsbq2hLBE1nUWJMOmyl700jMbS2Mwn'
);

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
        .then((resp) => {
          console.log(resp);
          // postRequest('/payment/method/attach', {
          //   paymentMethod: resp.paymentMethod,
          // })
          //   .then((resp) => {
          //     // Handle success
          //   })
          //   .catch((err) => {
          //     /*Handle Error */
          //   });
          // console.log(resp);
          setShowSpinner(false);
        });
    } catch (err) {
      // Handle Error
      console.log(err);
      setShowSpinner(false);
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
