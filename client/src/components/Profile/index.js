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

  const [menuIndex, setMenuIndex] = useState(0);

  // Right menu items
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const menuItems = [{
    name: 'Followings',
    value: followings
  },
  {
    name: 'Followers',
    value: followers
  },
  {
    name: 'Visited places',
    value: []
  },
  {
    name: 'Places to visit',
    value: []
  }
  ]



  if (!user) {
    return <Redirect to='/auth' />
  }

  return (
    <div className="wrapper">
      <div className="menu">
        <div className="items">
          {menuItems.map((item, index) => {
            return (<div className={`item ${menuIndex === index ? 'active' : ''}`} onClick={() => {
              setMenuIndex(index)
              setSelectedMenuItem('');
            }
            }>{item.name} {isLoading && <CircularProgress size={'1rem'} />}</div>)
          })}
        </div>
        <div className='selectedMenu'>
          <div className='selectedMenuItems'>
            {isLoading ? 'loading...' : menuItems[menuIndex].value.length < 1 ? <div className='noResults'>No results</div> : menuItems[menuIndex].value.map((item) => {
              return <div onClick={() => setSelectedMenuItem(item)} className={`selectedMenuItem ${item === selectedMenuItem ? 'active' : ''}`}>{item.name}</div>
            })}
          </div>
        </div>

      </div>
      <div className="posts">
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
