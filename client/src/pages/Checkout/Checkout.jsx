import React from 'react'

import "./Checkout.css"

function Checkout() {
  return (
    <div>
      <div className="checkout-heading">Checkout</div><br/>
      <div className="checkout-sub-heading">Title:</div>
      <div className="checkout-text-grey">Color Brust</div><br/>
      <div className="checkout-sub-heading">Type:</div>
      <div className="checkout-text-accent">Original</div><br/>
      <div className="checkout-sub-heading">Format</div>
      <div className="checkout-text-grey">pdf</div><br/>
      <div className="checkout-sub-heading">Dimention:</div>
      <div className="checkout-text-grey">560*1080 px</div><br/>
      <div className="checkout-sub-heading">Price:</div>
      <div className="checkout-price-details">
        <div className="checkout-text-grey">E-art-fee - 85%</div>
        <div className="checkout-text-grey">$8500</div>
      </div>
      <div className="checkout-price-details">
        <div className="checkout-text-grey">Creator fee - 10%</div>
        <div className="checkout-text-grey">$1000</div>
      </div>
      <div className="checkout-price-details">
        <div className="checkout-text-grey">Haveeart fee - 5%</div>
        <div className="checkout-text-grey">$500</div>
      </div>
      <div className='checkout-price-bar'></div>
      <div className="checkout-price-details">
        <div className="checkout-text-accent-large">Total Price</div>
        <div className="checkout-text-accent-large">$10,000</div>
      </div><br/>
      <div className="checkout-sub-heading">Payment Option:</div>
      <div className="checkout-payment-option">
          <div className='checkout-payment-option-radio' />
          <div className="checkout-payment-text-accent"> VISA **** **** **** 2139</div>
      </div><br/>
      <div className="checkout-payment-option">
          <div className='checkout-payment-option-radio'/>
          <div className="checkout-payment-text-grey"> Master Card **** **** **** 2139</div>
      </div><br/>
      <div className='checkout-add-button'>
       <div className='checkout-add-button-sign'>+</div> 
       <button className='checkout-add-button-text'>Add New</button>
      </div><br/>
      <div className="checkout-condition">
      <div className="checkout-condition-option">
          <div className='checkout-condition-option-checkbox' />
          <div className="checkout-condition-text-grey"> I agree with the Terms and Conditions and Privacy Policy of the site.</div>
      </div><br/>
      <div className="checkout-condition-option">
          <div className='checkout-condition-option-checkbox'/>
          <div className="checkout-condition-text-grey"> I agree to buy this e-art and from now onwards
           I will be the owner of this e-art. The product will be automatically added to my collection.
          </div>
      </div><br/>
      <div className="checkout-button-group">
        <button className='checkout-cancel-button'>Cancel</button>
        <button className='checkout-confirm-button'>Confirm Payment</button>
      </div>
      </div>
    </div>
  )
}

export default Checkout
