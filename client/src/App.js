import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import UserPosts from './UserPosts/UserPosts';
import { useDispatch } from 'react-redux';
import { getFollowers, getFollowings } from './actions/users';
import Profile from './components/Profile';
import { getPosts } from './actions/posts';




const onMountApp = (dispatch) => {
  console.log('-App mounted-');
  console.log('Get all following users.')
  dispatch(getFollowings());
  dispatch(getFollowers());
}

const App = () => {
  const dispatch = useDispatch();

  const getUser = () => {
    console.log('desi se')
    return JSON.parse(localStorage.getItem('profile')) || null;
  }


  useEffect(() => {
    if (getUser()) {
      console.log('desu se 2');
      onMountApp(dispatch);
    }
    dispatch(getPosts())
  }, [])


  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!getUser() ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/posts/userPosts/:id" exact component={UserPosts} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
