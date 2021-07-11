import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import { NavLink } from 'react-router-dom';


import CommentsForm from '../Comments/CommentsForm';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const user = localStorage.getItem('profile');

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={7}>
      <div className={classes.card} >
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant="p" component="h2" style={{ margin: '10px 0px' }}>
            {post.category}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.description}
          </Typography>
          <Typography variant="h6">Created by: <NavLink style = {{textDecoration : 'none', color : 'blue'}} to = { `/posts/userPosts/${post.creator}`}> {post.name} </NavLink></Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            alt={post.title}
          />

          <Typography variant="body1">
            <CommentsForm postId={id} />
          </Typography>
        </div>
       
      </div>
    </Paper>
  );
};

export default Post;
