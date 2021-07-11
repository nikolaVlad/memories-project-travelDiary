import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchUserPosts } from '../api';
import Post from '../components/Posts/Post/Post';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));



const UserPosts = () => {
  const { id } = useParams();
  const classes = useStyles();


  const [posts, setPosts] = useState('');

  async function getPostsFromApi() {
    let data = await fetchUserPosts(id);
    data = data.data.data;
    setPosts(data);
  }

  useEffect(() => {
    getPostsFromApi();
  }, []);

  useEffect(() => {
    getPostsFromApi();
  }, [id]);

  return (
    <>
    <h2 className={classes.root}> <span style = {{color : 'blueviolet'}}> {posts && posts[0].name} </span> `s posts</h2>
   


    <Grid  container alignItems="stretch" spacing={3}>
      {posts &&
        posts.map((post) => {
          return (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} noActionsVar />
            </Grid>
          );
        })}
    </Grid>

    </>
  );
};

export default UserPosts;
