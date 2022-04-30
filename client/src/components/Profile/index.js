import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import Posts from '../Posts/Posts';
import './styles.scss';

const Profile = () => {
  const { followings } = useSelector(state => state.users);
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(() => {
    console.log(followings);
  }, [])

  // #point: Kad sve popravim ovde treba kao useState inicijalno da stoji 0 index
  const [leftMenuItem, setLeftMenuItem] = useState(1);

  // Potreban niz items-a koji ce biti postavljeni tu
  const [rightMenuItem, setRightMenuItem] = useState();

  const leftMenuItems = ['Followers', 'Following', 'Visited Places', 'Places to visit'];

  const [rightMenuItems, setRightMenuItems] = useState([]);

  useEffect(() => {

  }, []);

  const changeLeftMenuItem = (index) => {
    setLeftMenuItem(index);

    // Get followers
    if (index === 0) {
    }

    // Get followings
    if (index === 1) {
      setRightMenuItem('followingUsers');
    }

    // Get visited places
    if (index === 2) {
    }

    // Get places to visit
    if (index === 3) {
    }
  };

  if (!user) {
    return <Redirect to='/auth' />
  }

  return (
    <div className="wrapper">
      <div className="menu">
        <div className="items">
          {leftMenuItems.map((item, index) => {
            return (
              <div key={index} onClick={() => changeLeftMenuItem(index)} className={`item ${index === leftMenuItem ? 'active' : ''}`}>
                {item}
              </div>
            );
          })}
        </div>

        <div className="selectedMenu">
          {rightMenuItems?.map((item) => {
            return <div className="selectedMenuItems">{item}</div>;
          })}
        </div>
      </div>
      <div className="posts">
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
