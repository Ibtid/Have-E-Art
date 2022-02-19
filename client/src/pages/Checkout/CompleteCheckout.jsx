import React from 'react'
import "./CompleteCheckout.css"

function CompleteCheckout() {
  return (
    <div>
    <div className='checkout-complete-heading'>Congratulations!</div>
        <div className='checkout-complete-sub-heading'>This item now belongs to you.</div>
        <div className='checkout-complete-button'>
         <div className='back-home-button'>Go to Home</div>
         <div className='back-collection-button'>Go to My collection</div>
        </div>
    </div>
    
  )
}

export default CompleteCheckout