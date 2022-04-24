import React from "react";
import { useState } from "react";
import dispatch from "../../dispatcher/dispatch";
import { Grid, Container } from "@material-ui/core";

import Input from "./InputField";

import { useContext } from "react";
import { AppContext } from "../../hooks/AppContext.js";

import "./Authentication.css";
import actions from "../../dispatcher/actions";
import Spinkit from "../Spinkit/Spinkit";

function AuthForm(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {contextStore, setContextStore} = useContext(AppContext);
    const [errors,setErrors] = useState([]);

    const[showSpinner, setShowSpinner] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const onClickSignUp = async (e) => {
        e.preventDefault();
        setShowSpinner(true)
        console.log(formData);
        let response = await dispatch(actions.signUp, {}, { ...formData });
        if(response.errors){
            console.log(response);
            let allErrors={}
            response.errors.forEach((error)=>{
                allErrors[error.param]={msg: error.msg, param: error.param}
            })
            if(formData.confirmPassword!==formData.password){
                allErrors['confirmPassword']={msg:`Password doesn't match`, param:'confirmPassword'}
            }
            console.log(allErrors);
            setErrors(allErrors)
            return
        }
        const token = response
        response = await dispatch(actions.getMyProfile, {}, {}, response)
        console.log(response)
        if(response.errors){
            console.log(response)
            return
        }
        setContextStore({...contextStore, user: {...response, token}, loggedIn: true})
        props.closeForm();
        setShowSpinner(false)
    };
    const onClickLogIn = async (e) => {
        e.preventDefault();
        setShowSpinner(true)
        console.log(formData);
        let response = await dispatch(
            actions.login,
            {},
            { email: formData.email, password: formData.password }
        );
        if(response.errors){
            console.log(response);
            let allErrors={}
            response.errors.forEach((error)=>{
                allErrors[error.param]={msg: error.msg, param: error.param}
            })
            if(formData.confirmPassword!==formData.password){
                allErrors['confirmPassword']={msg:`Password doesn't match`, param:'confirmPassword'}
            }
            console.log(allErrors);
            setErrors(allErrors)
          
            return
        }
        const token = response
        response = await dispatch(actions.getMyProfile, {}, {}, response)
        console.log(response)
        if(response.errors){
            console.log(response)
            return
        }
        setContextStore({...contextStore, user: {...response, token}, loggedIn: true})
        props.closeForm();
        setShowSpinner(false)
    };
    const onChangeFormData = (e) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="modal-container">
            {showSpinner && <Spinkit/>}
            <div className="modal-paper">
                {props.isSignup ? (
                    <div className="auth-btn-grid">
                        <button
                            className="sign_up-btn1"
                            onClick={props.handleSignUp}
                        >
                            {" "}
                            Register{" "}
                        </button>
                        <button
                            className="sign_in-btn1"
                            onClick={props.handleSignIn}
                        >
                            {" "}
                            Login{" "}
                        </button>
                    </div>
                ) : (
                    <div className="auth-btn-grid">
                        <button
                            className="sign_up-btn2"
                            onClick={props.handleSignUp}
                        >
                            {" "}
                            Register{" "}
                        </button>
                        <button
                            className="sign_in-btn2"
                            onClick={props.handleSignIn}
                        >
                            {" "}
                            Login{" "}
                        </button>
                    </div>
                )}
                <div className="modal-heading">
                    Join <p className="modal-sub-heading"> &nbsp;and&nbsp;</p>{" "}
                    explore{" "}
                    <p className="modal-sub-heading">
                        {" "}
                        &nbsp;the world of e-art
                    </p>
                </div>
                <form className="form">
                    <Grid container spacing={5}>
                        {props.isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    half
                                    errors={errors}
                                    onChange={onChangeFormData}
                                    value={formData.firstName}
                                />
                                
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    half
                                    onChange={onChangeFormData}
                                    value={formData.lastName}
                                    errors={errors}
                                />
                               
                                <Input
                                    extra
                                    name="userName"
                                    label="userName"
                                    onChange={onChangeFormData}
                                    value={formData.userName}
                                    errors={errors}
                                />

                            </>
                        )}

                        <Input
                            extra
                            name="email"
                            label="Email Address"
                            type="email"
                            onChange={onChangeFormData}
                            value={formData.email}
                            errors={errors}
                        />
                        
                        <Input
                            extra
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={onChangeFormData}
                            value={formData.password}
                            errors={errors}
                        />
                        
                        {props.isSignup && (
                            <Input
                                extra
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onChange={onChangeFormData}
                                value={formData.confirmPassword}
                                errors={errors}
                            />
                        )}
                    </Grid>
                    {props.isSignup ? (
                        <div className="modal-footer">
                            <p className="footer-text">
                                Already have an account?{" "}
                                <a className="footer-sub-text">
                                    <u>&nbsp;Login</u>
                                </a>
                            </p>
                            <button
                                type="submit"
                                variant="contained"
                                className="confirm-btn"
                                onClick={onClickSignUp}
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="modal-content">
                                <div className="modal-checkbox-content">
                                    <input
                                        className="modal-checkbox"
                                        type="checkbox"
                                    />
                                    <p className="modal-checkbox-text">
                                        Remember me
                                    </p>
                                </div>
                                <p>
                                    <a className="modal-content-text">
                                        <u>&nbsp;Forgot password?</u>
                                    </a>
                                </p>
                            </div>
                            <div className="modal-footer">
                                <p className="footer-text">
                                    Don't have an account?{" "}
                                    <a className="footer-sub-text">
                                        <u>&nbsp;Register</u>
                                    </a>
                                </p>
                                <button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-btn"
                                    onClick={onClickLogIn}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div
                className={
                    props.isSignup ? "modal-bar-left" : "modal-bar-right"
                }
            ></div>
        </div>
    );
}

export default AuthForm;
