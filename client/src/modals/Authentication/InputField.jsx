import React from 'react';

import { Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, extra, autoFocus, type, handleShowPassword, value, onChange, errors }) =>{
  
  let classNameWithExtra = extra? "input-field input-extra":"input-field"
  classNameWithExtra = errors? errors[name]?`${classNameWithExtra} red__border`:classNameWithExtra :classNameWithExtra

  return (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <input className={classNameWithExtra}
      name={name}
      onChange={onChange}
      variant="outlined"
      required
      placeholder={label}
      autoFocus={autoFocus}
      type={type}
      value = {value}
      inputprops={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton style={{color:"#737983"}} onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
    {errors && errors[name] && <div className="form__error">{errors[name].msg}</div>}
  </Grid>
);}

export default Input;