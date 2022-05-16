import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getPosts } from '../../actions/posts';
import { getFollowers, getFollowings } from '../../actions/users';

import Posts from '../Posts/Posts';
import './styles.scss';

const Profile = () => {
  const { followings } = useSelector((state) => state.users);
  const { followers } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.users);
  const { avaliableCountries } = useSelector((state) => state.countries);

  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowings());
    dispatch(getPosts(undefined))
  }, []);

  const [menuIndex, setMenuIndex] = useState(0);

  // Right menu items
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const filterFunctionWithCreator = (posts) => {
    let res = posts;
    const creator = selectedMenuItem._id;
    if (creator) {
      res = res.filter((post) => post.creator === creator);
    }
    return res;
  };

  // #point: Ovo cu koristiti kasnije.
  const filterFunctionWithVisitedPlaces = (posts) => {
    let res = posts || [];
    
    const creator = user?.result?._id;
    res = (res.length > 0 && res?.filter((post) => post.creator === creator)) || [];
    if (selectedMenuItem) {
      res = res.filter((post) => {
        const parsedCountry = selectedMenuItem.name.slice(4, selectedMenuItem.length);

        return post.country?.trim() === parsedCountry.trim();
      });
    }
    return res;
  };

  const filterFunctionWithPlacesToVisit = (posts) => {
    let res = posts;
    const creator = user?.result?._id;
    res = res?.filter((post) => post.likes.includes(String(creator)));
    if (selectedMenuItem) {
      res = res.filter((post) => {
        const parsedCountry = selectedMenuItem.name.slice(4, selectedMenuItem.length);

        return post.country?.trim() === parsedCountry.trim();
      });
    }
    return res;
  };

  const menuItems = [
    {
      name: 'Visited places',
      value: avaliableCountries,
      filterFunction: filterFunctionWithVisitedPlaces,
      index: 0
    },
    {
      name: 'Places to visit',
      value: avaliableCountries,
      filterFunction: filterFunctionWithPlacesToVisit,
      index: 1
    },
    {
      name: 'Followers',
      value: followers,
      filterFunction: filterFunctionWithCreator
    },
    {
      name: 'Followings',
      value: followings,
      filterFunction: filterFunctionWithCreator
    }
  ];

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="wrapper">
      <div className="menu">
        <div className="items">
          {menuItems.map((item, index) => {
            return (
              <div
                className={`item ${menuIndex === index ? 'active' : ''}`}
                onClick={() => {
                  setMenuIndex(index);
                  setSelectedMenuItem('');
                }}
              >
                {item.name} {isLoading && <CircularProgress size={'1rem'} />}
              </div>
            );
          })}
        </div>
        <div className="selectedMenu">
          <div className="selectedMenuItems">
            {isLoading ? (
              'loading...'
            ) : menuItems[menuIndex].value.length < 1 ? (
              <div className="noResults">No results</div>
            ) : (
              menuItems[menuIndex].value.map((item) => {
                return (
                  <div onClick={() => setSelectedMenuItem(item)} className={`selectedMenuItem ${item === selectedMenuItem ? 'active' : ''}`}>
                    {item.name}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div>{selectedMenuItem.cretor}</div>
      </div>
      <div className="posts">
        <Posts
          index={menuItems[menuIndex].index}
          filterByUserFunction={menuItems[menuIndex].filterByUserFunction}
          filterFunction={menuItems[menuIndex].filterFunction}
        />
      </div>
    </div>
  );
};

export default Profile;
