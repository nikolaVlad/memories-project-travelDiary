import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getFollowers, getFollowings } from '../../actions/users';

import Posts from '../Posts/Posts';
import './styles.scss';

const Profile = () => {
  const { followings } = useSelector(state => state.users);
  const { followers } = useSelector(state => state.users);
  const { isLoading } = useSelector(state => state.users);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowings());
  }, [])

  useEffect(() => {
    setRightMenuItems(followers);
  }, [followers])

  useEffect(() => {
    console.log('desi se');
  }, [followings])

  // #point: Kad sve popravim ovde treba kao useState inicijalno da stoji 0 index
  const [leftMenuItem, setLeftMenuItem] = useState(0);

  // Potreban niz items-a koji ce biti postavljeni tu
  const [rightMenuItem, setRightMenuItem] = useState();

  const leftMenuItems = ['Followers', 'Followings', 'Visited Places', 'Places to visit'];

  const [rightMenuItems, setRightMenuItems] = useState([]);


  const changeLeftMenuItem = (index) => {
    setLeftMenuItem(index);
    setRightMenuItem('');
    // Get followers
    if (index === 0) {
      setRightMenuItems(followers);
    }

    // Get followings
    if (index === 1) {
      setRightMenuItems(followings);
    }

    // Get visited places
    if (index === 2) {
    }

    // Get places to visit
    if (index === 3) {
    }
  };

  const changeRightMenuItem = (value) => {
    setRightMenuItem(value);
  }

  if (!user) {
    return <Redirect to='/auth' />
  }

  return (
    <div className="wrapper">
      <div className="menu">
        <div className="items">
          {!isLoading ? leftMenuItems.map((item, index) => {
            return (
              <div key={index} onClick={() => changeLeftMenuItem(index)} className={`item ${index === leftMenuItem ? 'active' : ''}`}>
                {item}
              </div>
            );
          }) :
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress style={{ padding: '30px' }} size="1em" />
              <CircularProgress style={{ padding: '30px' }} size="1em" />
              <CircularProgress style={{ padding: '30px' }} size="1em" />
              <CircularProgress style={{ padding: '30px' }} size="1em" />
            </div>
          }
        </div>

        <div className="selectedMenu">
          {isLoading ? <div>Loading...</div> : rightMenuItems.length > 0 ? rightMenuItems?.map((item) => {
            return <div key={item._id} onClick={() => changeRightMenuItem(item.name)} className={`selectedMenuItems ${item.name === rightMenuItem ? 'active' : ''}`}>
              {item.name}
            </div>;
          }) :
            <div className='noResutls'>
              No results
            </div>}
        </div>
      </div>
      <div className="posts">
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
