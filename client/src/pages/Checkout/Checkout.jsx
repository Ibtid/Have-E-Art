import React, {useContext, useState} from 'react';

import './Checkout.css';

import {useNavigate} from 'react-router-dom';
import CardDetails from '../../modals/CardDetails/CardDetails';
import BigImageComponent from '../../layouts/BigImageComponent';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import getPrice from '../../utility/getPrice';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';


function Checkout() {
  let navigate = useNavigate()
  const {contextStore, setContextStore} = useContext(AppContext)
  const {setShowSpinner} = useContext(SpinnerContext)
  const [showForm, setShowForm] = useState(false);
  const onClickCheckOut = async (e) => {
    e.preventDefault()
    setShowSpinner(true)
    let response
    switch(contextStore.eart.type){
      case "original":
        response = await dispatch(actions.changeOwner, {}, {eart: contextStore.eart}, contextStore.user.token)
        console.log(response)
        if(response.errors){
          setShowSpinner(false)
          return
        }
        setShowSpinner(false)
        navigate("/checkoutComplete")
        break
      case "copy":
        response = await dispatch(actions.createCopyEart, {}, {edition: contextStore.edition}, contextStore.user.token)
        console.log(response)
        if(response.errors){
          setShowSpinner(false)
          return
        }
        setShowSpinner(false)
        navigate("/checkoutComplete")
        break
    }
  }
  return (
    <BigImageComponent imgUrl = {contextStore.eart.imgUrl}>
    <div>
       {showForm && (
        <CardDetails
          closeForm={() => {
            setShowForm(false);
          }}
        />
      )}
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
        <div className='checkout-text-grey'>{getPrice(contextStore.eart.price).eartPrice}</div>
      </div>
      <div className='checkout-price-details'>
        <div className='checkout-text-grey'>Creator fee - 10%</div>
        <div className='checkout-text-grey'>{getPrice(contextStore.eart.price).creatorFee}</div>
      </div>
      <div className='checkout-price-details'>
        <div className='checkout-text-grey'>Haveeart fee - 5%</div>
        <div className='checkout-text-grey'>{getPrice(contextStore.eart.price).platformFee}</div>
      </div>
      <div className='checkout-price-bar'></div>
      <div className='checkout-price-details'>
        <div className='checkout-text-accent-large'>Total Price</div>
        <div className='checkout-text-accent-large'>{contextStore.eart.price}</div>
      </div>
      <br />
      <div className='checkout-sub-heading'>Payment Option:</div>
      <div className='checkout-payment-option' >
        <div className='checkout-payment-option-radio' />
        <div className='checkout-payment-text-grey'>
          {' '}
          VISA **** **** **** 2139
        </div>
      </div>
      <br />
      <div className='checkout-payment-option' >
        <div className='checkout-payment-option-radio' />
        <div className='checkout-payment-text-grey'>
          {' '}
          Master Card **** **** **** 2139
        </div>
      </div>
      <br />
      <div className='checkout-add-button' onClick={() => {
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
          <button className='checkout-confirm-button' onClick={onClickCheckOut}>Confirm Payment</button>
        </div>
      </div>
    </div>
    </BigImageComponent>
  );
}

export default Checkout;
