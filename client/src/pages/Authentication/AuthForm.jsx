import React from 'react'
import {useState} from 'react';

import { Grid, Container} from '@material-ui/core';


import Input from './InputField';

import './Authentication.css';

function AuthForm(props) {
    
    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="modal-container">
      <div className="modal-paper">  
      { props.isSignup?
      <div className='auth-btn-grid'>
       
        <button  className='sign_up-btn1' onClick={props.handleSignUp} > Sign up </button>
        <button  className='sign_in-btn1' onClick={props.handleSignIn} > Sign in </button>
      </div>
      :
        <div className='auth-btn-grid'>
       
        <button  className='sign_up-btn2' onClick={props.handleSignUp} > Sign up </button>
        <button  className='sign_in-btn2' onClick={props.handleSignIn} > Sign in </button>
      </div>
      }
      <div className='modal-heading'>
        Join <p className='modal-sub-heading'> &nbsp;and&nbsp;</p> explore <p className='modal-sub-heading'> &nbsp;the world of art</p>
      </div>
        <form className="form">
          <Grid  container spacing={5}>
            
            {props.isSignup &&(
              <> 
              <Input name="firstName" label="First Name" half />
              <Input name="lastName" label="Last Name" half />
              </>
            )}
                 
            <Input extra name="email" label="Email Address"  type="email" />
            <Input extra name="password" label="Password" type={showPassword ? 'text' : 'password'} />
            {props.isSignup && <Input extra name="confirmPassword" label="Confirm Password" type="password" /> }
          </Grid>
          { props.isSignup? 
          ( 
          <div className='modal-footer'>
           <p className='footer-text'>Already have an account? <a className='footer-sub-text'><u>&nbsp;sign in</u></a></p> 
           <button type="submit" variant="contained" className="confirm-btn">
            Sign up
          </button>
          </div>
           )
           :(<div><div className='modal-content'>
            <div className='modal-checkbox-content'>
            <input className='modal-checkbox' type="checkbox"/>
            <p className='modal-checkbox-text'>Remember me</p>
            </div>
            <p><a className='modal-content-text'><u>&nbsp;Forgot password?</u></a></p>
          </div>
          <div className='modal-footer'>
           <p className='footer-text'>Don't have an account? <a className='footer-sub-text'><u>&nbsp;sign up</u></a></p>
          <button type="submit" variant="contained" className="confirm-btn">
            Sign in
          </button>
          </div> 
          </div>
          )}
        </form>
    </div>
    <div className={props.isSignup? "modal-bar-left": "modal-bar-right"}>

    </div>
    </div>
  )
}

export default AuthForm