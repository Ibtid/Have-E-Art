import React from 'react'
import {useState} from 'react';

import { Grid, Container} from '@material-ui/core';


import Input from './InputField';

import './Authentication.css';

function AuthForm(props) {
    
    const [showPassword, setShowPassword] = useState(false)

  return (
      <div>
    <Container className="modal-container" component="main" maxWidth="sm">
      <div className="modal-paper" elevation={3}>  
      { props.isSignup?
      <div className='auth-btn-grid'>
       
        <button fullWidth className='sign_up-btn1' onClick={props.handleSignUp} > Sign up </button>
        <button fullWidth className='sign_in-btn1' onClick={props.handleSignIn} > Sign in </button>
      </div>
      :
        <div className='auth-btn-grid'>
       
        <button fullWidth className='sign_up-btn2' onClick={props.handleSignUp} > Sign up </button>
        <button fullWidth className='sign_in-btn2' onClick={props.handleSignIn} > Sign in </button>
      </div>
      }
      <div className='modal-heading'>
        Join <p className='modal-sub-heading'> &nbsp;and&nbsp;</p> explore <p className='modal-sub-heading'> &nbsp;the world of art</p>
      </div>
        <form className="form">
          <Grid  container spacing={5}>
            
            {props.isSignup &&(
              <> 
              <Input className="input-field" name="firstName" placeholder="First name" label="First Name" autoFocus half />
              <Input name="lastName" className="input-field" label="Last Name" half />
              </>
            )}
                 
            <Input className="input-field" name="email" label="Email Address"  type="email" />
            <Input className="input-field" name="password" label="Password" type={showPassword ? 'text' : 'password'} />
            {props.isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" /> }
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
    </Container>
</div>
  
  )
}

export default AuthForm