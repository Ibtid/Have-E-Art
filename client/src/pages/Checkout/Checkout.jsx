import React, { useContext, useState, useEffect } from 'react';

import './Checkout.css';

import { useNavigate } from 'react-router-dom';
import CardDetails from '../../modals/CardDetails/CardDetails';
import BigImageComponent from '../../layouts/BigImageComponent';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import getPrice from '../../utility/getPrice';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';

import StripeCheckout from 'react-stripe-checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Checkout() {
  let navigate = useNavigate();
  const stripePromise = loadStripe(
    'pk_test_51HZDOcHKFvH5Oe64NcisIbwlEP1GXpFzpIWKhNeM6Qj6rgbFsHfxwJNFHyFXXtkfSosJZsbq2hLBE1nUWJMOmyl700jMbS2Mwn'
  );

  const { contextStore, setContextStore } = useContext(AppContext);
  const { setShowSpinner } = useContext(SpinnerContext);
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const transferOwnerShip = async (paymentMethod, amount) => {
    setShowSpinner(true);
    let response;
    switch (contextStore.eart.type) {
      case 'original':
        response = await dispatch(
          actions.changeOwner,
          {},
          { eart: contextStore.eart,  paymentMethod, amount},
          contextStore.user.token
        );
        console.log(response);
        if (response.errors) {
          setShowSpinner(false);
          return;
        }
        setShowSpinner(false);
        navigate('/checkoutComplete');
        break;
      case 'copy':
        response = await dispatch(
          actions.createCopyEart,
          {},
          { edition: contextStore.edition, paymentMethod, amount },
          contextStore.user.token
        );
        console.log(response);
        if (response.errors) {
          setShowSpinner(false);
          return;
        }
        setShowSpinner(false);
        navigate('/checkoutComplete');
        break;
    }
  };
  useEffect(() => {
    (async () => {
      const response = await dispatch(
        actions.getPaymentMethods,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      setPaymentMethod(response.data);
    })();
  }, [showForm]);

  const handleSelectCard = async (method) => {
    if (method.id === selectedMethod?.id) {
      setSelectedMethod(null);
    } else setSelectedMethod(method);
  };
  const confirmPayment = async () => {
      if(selectedMethod){
        await transferOwnerShip(selectedMethod.id,contextStore.eart.price );
      }
      else{
        alert("Please Select Card")
      }
  };

  return (
    <BigImageComponent imgUrl={contextStore.eart.imgUrl}>
      {showForm && (
        <Elements stripe={stripePromise}>
          <CardDetails
            closeForm={() => {
              setShowForm(false);
            }}
          />
        </Elements>
      )}

      <div>
        <div className='checkout-heading'>Checkout</div>
        <br />
        <div className='checkout-sub-heading'>Title:</div>
        <div className='checkout-text-grey'>{contextStore.eart.title}</div>
        <br />
        <div className='checkout-sub-heading'>Type:</div>
        <div className='checkout-text-accent'>{contextStore.eart.type}</div>
        <br />
        <div className='checkout-sub-heading'>Format</div>
        <div className='checkout-text-grey'>{contextStore.eart.format}</div>
        <br />
        <div className='checkout-sub-heading'>Dimension:</div>
        <div className='checkout-text-grey'>560*1080 px</div>
        <br />
        <div className='checkout-sub-heading'>Price:</div>
        <div className='checkout-price-details'>
          <div className='checkout-text-grey'>E-art-fee - 85%</div>
          <div className='checkout-text-grey'>
            {getPrice(contextStore.eart.price).eartPrice}
          </div>
        </div>
        <div className='checkout-price-details'>
          <div className='checkout-text-grey'>Creator fee - 10%</div>
          <div className='checkout-text-grey'>
            {getPrice(contextStore.eart.price).creatorFee}
          </div>
        </div>
        <div className='checkout-price-details'>
          <div className='checkout-text-grey'>Haveeart fee - 5%</div>
          <div className='checkout-text-grey'>
            {getPrice(contextStore.eart.price).platformFee}
          </div>
        </div>
        <div className='checkout-price-bar'></div>
        <div className='checkout-price-details'>
          <div className='checkout-text-accent-large'>Total Price</div>
          <div className='checkout-text-accent-large'>
            {contextStore.eart.price}
          </div>
        </div>
        <br />
        <div className='checkout-sub-heading'>Payment Option:</div>
        {paymentMethod.map((method) => (
          <div
            onClick={() => {
              handleSelectCard(method);
            }}>
            <br />
            <div className='checkout-payment-option'>
              <div
                className={
                  method.id === selectedMethod?.id
                    ? 'checkout-payment-option-radio-selected'
                    : 'checkout-payment-option-radio'
                }
              />
              <div className='checkout-payment-text-grey'>
                {' '}
                {method.card.brand.toUpperCase()} **** **** ****{' '}
                {method.card.last4}
              </div>
            </div>
            {/* <br />
            <label className='cardDetails__label'>CC/CVC:</label>
            <input className='cardDetails__input' /> */}
          </div>
        ))}
        <br />
        <div
          className='checkout-add-button'
          onClick={() => {
            setShowForm(true);
          }}>
          <div className='checkout-add-button-sign'>+</div>
          <button className='checkout-add-button-text'>Add New</button>
        </div>
        <br />
        <div className='checkout-condition'>
          <div className='checkout-condition-option'>
            <div className='checkout-condition-option-checkbox' />
            <div className='checkout-condition-text-grey'>
              {' '}
              I agree with the Terms and Conditions and Privacy Policy of the
              site.
            </div>
          </div>
          <br />
          <div className='checkout-condition-option'>
            <div className='checkout-condition-option-checkbox' />
            <div className='checkout-condition-text-grey'>
              {' '}
              I agree to buy this e-art and from now onwards I will be the owner
              of this e-art. The product will be automatically added to my
              collection.
            </div>
          </div>
          <br />
          <div className='checkout-button-group'>
            <button className='checkout-cancel-button'>Cancel</button>
            <button
              className='checkout-confirm-button'
              onClick={() => {
                confirmPayment();
              }}>
              Confirm Payment
            </button>
            {/* <StripeCheckout
              stripeKey='pk_test_51HZDOcHKFvH5Oe64NcisIbwlEP1GXpFzpIWKhNeM6Qj6rgbFsHfxwJNFHyFXXtkfSosJZsbq2hLBE1nUWJMOmyl700jMbS2Mwn'
              token={() => {}}
              name={contextStore.eart.title}
              currency='USD'
              description='Pay with Card'
              image={contextStore.eart.imgUrl}
              amount={contextStore.eart.price * 100}>
              <button className='checkout-confirm-button' onClick={() => {}}>
                Confirm Payment
              </button>
            </StripeCheckout> */}
          </div>
        </div>
      </div>
    </BigImageComponent>
  );
}

export default Checkout;
