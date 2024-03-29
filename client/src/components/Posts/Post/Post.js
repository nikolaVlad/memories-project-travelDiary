import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { addFollower } from '../../../api';
import { useSelector } from 'react-redux';
import { getFollowing } from '../../../actions/user';

const Post = ({ post, setCurrentId, noActionsVar }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  // Ova 2 mogu da spojim u jedno
  const [follow, setFollow] = useState('');
  const followingUsers = useSelector((state) => state.user.following);

  const checkIfFollowingCreator = useCallback(() => {
    if (followingUsers.length > 0 && followingUsers.includes(post.creator)) {
      return setFollow('- unfollow');
    }

    return setFollow('+ follow');
  });

  useEffect(() => {
    checkIfFollowingCreator();
  }, [checkIfFollowingCreator, followingUsers]);

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  const onFollowUnfollow = async (e, followerId) => {
    e.stopPropagation();
    // Add (or Remove) one user in following users
    await addFollower(followerId);

    // Update state ( get all following users from the API)
    dispatch(getFollowing());

    checkIfFollowingCreator();
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title}
        >
          <div
            className={classes.test}
            onClick={(e) => {
              onFollowUnfollow(e, post.creator);
            }}
          >
            {user && user.result._id !== post.creator && (
              <Typography variant="body1" style={{ zIndex: '4' }}>
                {follow}
              </Typography>
            )}
          </div>
        </CardMedia>

        <div className={classes.overlay}>
          <Typography variant="h6" style={{ maxWidth: '80%' }}>
            {post.name}nikola nikioc{' '}
          </Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}

        <Typography className={classes.title} variant="h6" color="black">
          {post.category}
        </Typography>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      {!noActionsVar && (
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          {user?.result?._id === post?.creator && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
