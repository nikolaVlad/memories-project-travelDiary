import React from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import { useDispatch } from 'react-redux';
import { changeFollow } from '../../actions/users';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { followings } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onChangeFollow = async (followingUserId) => {

    dispatch(changeFollow(followingUserId));
  }
  if (!posts?.length && !isLoading) return 'No posts';

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} onChangeFollow={() => onChangeFollow(post.creator)} isFollowing={followings.map(user => user._id).includes(post.creator)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
