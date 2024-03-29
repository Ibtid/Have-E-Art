import React, { useEffect } from 'react';
import { useState } from 'react';
import dispatch from '../../dispatcher/dispatch';
import { Grid, Container } from '@material-ui/core';

import Input from './InputField';

import { useContext } from 'react';
import { AppContext } from '../../hooks/AppContext.js';
import './Authentication.css';
import actions from '../../dispatcher/actions';
import Spinkit from '../Spinkit/Spinkit';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import { io } from 'socket.io-client';
import UserNameModal from '../UserName/UserName.modal';

function AuthForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore, setContextStore } = useContext(AppContext);
  const [errors, setErrors] = useState([]);
  const [gtoken, setGtoken] = useState("")

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const processToken = async (token) => {
    let response = await dispatch(actions.getMyProfile, {}, {}, token);
    console.log(response);
    if (response.errors) {
      console.log(response);
      setShowSpinner(false);
      return;
    }
    const user = { ...response, token };
    localStorage.setItem('user', JSON.stringify(user));
    const socket = io('https://socketapi.haveeart.com', {
      reconnectionDelayMax: 10000,
      auth: {
        token: user.token,
      },
    });
    const notifications = await dispatch(
      actions.getNotificationsNotViewed,
      {},
      {},
      user.token
    );
    setContextStore({
      ...contextStore,
      user,
      loggedIn: true,
      socket,
      notifications,
    });
  };
  const onClickSignUp = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    console.log(formData);
    let response = await dispatch(actions.signUp, {}, { ...formData });
    if (response.errors) {
      console.log(response);
      let allErrors = {};
      response.errors.forEach((error) => {
        allErrors[error.param] = { msg: error.msg, param: error.param };
      });
      if (formData.confirmPassword !== formData.password) {
        allErrors['confirmPassword'] = {
          msg: `Password doesn't match`,
          param: 'confirmPassword',
        };
      }
      console.log(allErrors);
      setErrors(allErrors);
      setShowSpinner(false);
      return;
    }
    await processToken(response);
    setShowSpinner(false);
    props.closeForm();
  };
  const onClickLogIn = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    console.log(formData);
    let response = await dispatch(
      actions.login,
      {},
      { email: formData.email, password: formData.password }
    );
    if (response.errors) {
      console.log(response);
      let allErrors = {};
      response.errors.forEach((error) => {
        allErrors[error.param] = { msg: error.msg, param: error.param };
      });

      console.log(allErrors);
      setErrors(allErrors);
      setShowSpinner(false);
      return;
    }
    await processToken(response);
    setShowSpinner(false);
    props.closeForm();
  };
  const onChangeFormData = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUserName = async (userName) => {
    setShowSpinner(true)
    const token = await dispatch(
      actions.signInWithGoogle, 
      {},
      {gtoken, userName}
    )
    if(!token.errors){
      await processToken(token)
    }
    setShowSpinner(false)
    props.closeForm()
  }
  const hangleGoogleLogin = async (response) => {
    setShowSpinner(true);
    console.log(response.credential);
    setGtoken(response.credential)
    const response1 = await dispatch(
      actions.signInWithGoogleCheck,
      {},
      { gtoken: response.credential }
    );
    if(response1.userExists){
      const token = await dispatch(
        actions.signInWithGoogle, 
        {},
        {gtoken: response.credential}
      )
      await processToken(token)
      props.closeForm()
      setShowSpinner(false)
    }
    else{
      setShowSpinner(false)
      props.setOpenUserNameModal(true);
    }
  };
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        '390554336762-3e4opbptvh0g82245kc2s5oa2jedtrv8.apps.googleusercontent.com',
      callback: hangleGoogleLogin,
    });
    window.google.accounts.id.renderButton(document.getElementById('gsignin'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  return (
    <div className='modal-container'>
      {props.openUserNameModal && (
        <UserNameModal
          closeForm={(userName) => {
            handleUserName(userName)
            props.setOpenUserNameModal(false);
          }}
        />
      )}
      <div className='modal-paper'>
        {props.isSignup ? (
          <div className='auth-btn-grid'>
            <button className='sign_up-btn1' onClick={props.handleSignUp}>
              {' '}
              Register{' '}
            </button>
            <button className='sign_in-btn1' onClick={props.handleSignIn}>
              {' '}
              Login{' '}
            </button>
          </div>
        ) : (
          <div className='auth-btn-grid'>
            <button className='sign_up-btn2' onClick={props.handleSignUp}>
              {' '}
              Register{' '}
            </button>
            <button className='sign_in-btn2' onClick={props.handleSignIn}>
              {' '}
              Login{' '}
            </button>
          </div>
        )}
        <div className='modal-heading'>
          Join <p className='modal-sub-heading'> &nbsp;and&nbsp;</p> explore{' '}
          <p className='modal-sub-heading'> &nbsp;the world of e-art</p>
        </div>
        {
          <form className='form'>
            <Grid container spacing={5}>
              {props.isSignup && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    half
                    errors={errors}
                    onChange={onChangeFormData}
                    value={formData.firstName}
                  />

                  <Input
                    name='lastName'
                    label='Last Name'
                    half
                    onChange={onChangeFormData}
                    value={formData.lastName}
                    errors={errors}
                  />

                  <Input
                    extra
                    name='userName'
                    label='userName'
                    onChange={onChangeFormData}
                    value={formData.userName}
                    errors={errors}
                  />
                </>
              )}

              <Input
                extra
                name='email'
                label='Email Address'
                type='email'
                onChange={onChangeFormData}
                value={formData.email}
                errors={errors}
              />

              <Input
                extra
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                onChange={onChangeFormData}
                value={formData.password}
                errors={errors}
              />

              {props.isSignup && (
                <Input
                  extra
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  onChange={onChangeFormData}
                  value={formData.confirmPassword}
                  errors={errors}
                />
              )}
            </Grid>
            {props.isSignup ? (
              <div className='modal-footer'>
                <p className='footer-text'>
                  Already have an account?{' '}
                  <a className='footer-sub-text'>
                    <u>&nbsp;Login</u>
                  </a>
                </p>
                <button
                  type='submit'
                  variant='contained'
                  className='confirm-btn'
                  >
                  Register
                </button>
              </div>
            ) : (
              <div>
                <div className='modal-content'>
                  <div className='modal-checkbox-content'>
                    <input className='modal-checkbox' type='checkbox' />
                    <p className='modal-checkbox-text'>Remember me</p>
                  </div>
                  <p>
                    <a className='modal-content-text'>
                      <u>&nbsp;Forgot password?</u>
                    </a>
                  </p>
                </div>
                <div className='modal-footer'>
                  <p className='footer-text'>
                    Don't have an account?{' '}
                    <a className='footer-sub-text'>
                      <u>&nbsp;Register</u>
                    </a>
                  </p>
                  <button
                    type='submit'
                    variant='contained'
                    className='confirm-btn'
                    >
                    Login
                  </button>
                </div>
              </div>
            )}
          </form>
        }
        <div className='modal-footer'>
          <div id='gsignin'></div>
          {/* <button
            className='confirm-btn'
            onClick={() => {
              props.setOpenUserNameModal(true);
            }}>
            UserName
          </button> */}
        </div>
      </div>
      <div
        className={props.isSignup ? 'modal-bar-left' : 'modal-bar-right'}></div>
    </div>
  );
}

export default AuthForm;
