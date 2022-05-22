import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles';
import * as actionType from '../../constants/actionTypes';
import traveldiary from '../../images/traveldiary.png';
import Edit from '@material-ui/icons/EditTwoTone';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  let country = user?.result?.country || '';
  if (country) {
    console.log(country.split(' ')[0]);
    country = country.split(' ')[0];
  }

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    dispatch({ type: actionType.RESET_USERS });
    localStorage.clear();
    history.push('/auth');
    setUser(null);
  };

  const onClickEdit = () => {
    history.push('/editProfile');
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser('');
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">

      <div className={classes.brandContainer}>
        <img className={classes.image} src={traveldiary} alt="icon" height="60" />
        <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">
          TravelDiary
        </Typography>
        <div style={{ marginLeft: '20px', fontSize: '30px', marginTop: '10px' }}>{country}</div>
      </div>
      <Toolbar className={classes.toolBar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/profile')}
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result?.imageUrl}
            >
              <span >{user.result.name.charAt(0)}</span>
            </Avatar>

            <Typography className={classes.userName} onClick={() => onClickEdit()} variant="h6">
              {user.result.name} <Edit />
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
