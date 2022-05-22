import { Button, Container, Grid, Input, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api'
import FileBase from 'react-file-base64';


const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const initialState = {
    firstName: user?.result?.name?.split(' ')[0],
    lastName: user?.result?.name?.split(' ')[1],
    country: user?.result?.country,
    email: user?.result?.email,
    password: '',
    imageUrl: ''
  };
  const [formData, setFormData] = useState(initialState);
  const { countries } = useSelector((state) => state.countries);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setCountry = (e) => {
    setFormData({ ...formData, country: e.target.value });
  };

  const handleSubmit = async () => {
    const data = await api.editProfile(formData);
    const result = data.data;
    const oldResult = JSON.parse(localStorage.getItem('profile'));
    const oldResultKey = oldResult.result;
    const newResultKey = { ...oldResultKey, name: result.name, country: result.country, email: result.email, imageUrl: result.imageUrl };
    const newResult = {
      result: newResultKey
    }
    localStorage.clear();
    localStorage.setItem('profile', JSON.stringify({ ...newResult, token: oldResult.token }));

    history.push('/profile');

  }


  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Paper className="papper">
          <div className="row">
            <Typography>First name</Typography>
            <input name="firstName" onChange={handleChange} value={formData.firstName} />
          </div>
          <div className="row">
            <Typography>Last name</Typography>
            <input name="lastName" onChange={handleChange} value={formData.lastName} />
          </div>
          <div className="row">
            <Typography>Country</Typography>
            <TextField value={formData.country} className="country-field" onChange={(e) => setCountry(e)} select variant="outlined" name="Country">
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
          </div>
          <div className="row">
            <Typography>Email</Typography>
            <input name='email' onChange={handleChange} value={formData.email} />
          </div>
          <div className="row">
            <Typography>Old password</Typography>
            <input className='oldPassField' disabled type="password" value={user.result.password.slice(0, 7) || ''} />
          </div>
          <div className="row">
            <Typography>New password</Typography>
            <input name="password" onChange={handleChange} type="password" value={formData.password} />
          </div>
          <div style={{ backgroundColor: 'transparent' }} className="row" >
            <Typography>Profile picture:</Typography>
            <div className='file'>
              <FileBase type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setFormData({ ...formData, imageUrl: base64 })
                }} />
            </div>

          </div>
          <div className="actions">
            <Button onClick={handleSubmit} style={{ marginRight: '8px', width: '12%' }} color="primary" size="small" variant="contained">
              Save
            </Button>
            <Button onClick={() => history.push('/profile')} color="default" size="small" variant="text">
              Close
            </Button>
          </div>
        </Paper>
      </Container>
    </div >
  );
};

export default EditProfile;
