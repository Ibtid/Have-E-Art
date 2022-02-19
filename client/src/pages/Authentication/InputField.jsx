import React from 'react';

import { Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, extra, autoFocus, type, handleShowPassword }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <input className={extra? "input-field input-extra":"input-field"}
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      placeholder={label}
      autoFocus={autoFocus}
      type={type}
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
  </Grid>
);

export default Input;