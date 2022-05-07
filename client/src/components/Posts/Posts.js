import React, { useEffect } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import { useDispatch } from 'react-redux';
import { changeFollow } from '../../actions/users';
import { setAvaliableCountries } from '../../actions/countries';

const Posts = ({ setCurrentId, filterFunction, index }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { followings } = useSelector((state) => state.users);
  const { countries } = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const onChangeFollow = async (followingUserId) => {
    dispatch(changeFollow(followingUserId));
  };

  const filteredPosts = filterFunction ? filterFunction(posts) : posts;

  useEffect(() => {
    if (index !== undefined) {
      let res = [];
      // Prvo uzimam sve drzave
      const postsContries = filteredPosts.map((post) => post.country);

      res = countries.filter((country) => postsContries.includes(country.name));
      res = res.map((el) => el.flag + ' ' + el.name);

      dispatch(setAvaliableCountries(res || []));
    }
  }, [index, posts]);

  if (!filteredPosts?.length && !isLoading) return 'No posts';

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {filteredPosts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            onChangeFollow={() => onChangeFollow(post.creator)}
            isFollowing={followings.map((user) => user._id).includes(post.creator)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
