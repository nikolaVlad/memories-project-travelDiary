import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, MenuItem, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import s from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
import { getFollowers, getFollowings } from '../../actions/users';
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

const initialState = {
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  password: '',
  confirmPassword: '',
  imageUrl: ''
};
const Auth = () => {
  const [showPassowrd, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = s();
  const dispatch = useDispatch();
  const history = useHistory();
  const { countries } = useSelector((state) => state.countries);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setCountry = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, country: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <React.Fragment>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                <TextField onChange={(e) => setCountry(e)} style={{ margin: '0px 10px' }} select fullWidth variant="outlined" name="Country" label="Country">
                  {countries.length > 0 &&
                    countries.map((country) => {
                      return (
                        <MenuItem key={country.name} value={country.flag + ' ' + country.name}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ paddingLeft: '20px' }}>{country.name}</div>
                            <div style={{ position: 'absolute', left: '8px' }}>{country.flag}</div>
                          </div>
                        </MenuItem>
                      );
                    })}
                </TextField>
              </React.Fragment>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassowrd ? 'text' : 'password'}
            />
            {isSignUp && (
              <div style={{ marginLeft: '10px', width: '100%' }}>
                <Input style={{ marginLeft: '0px' }} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={'password'} />
                <br />
                <div style={{display : 'flex', justifyContent:'space-evenly' , width:'100%', alignItems:'center'}}>
                  <Typography style={{marginRight:'50px'}}>Select profile picture:</Typography>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setFormData({ ...formData, imageUrl: base64 });
                    }}
                  />
                </div>
              </div>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
