import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper, MenuItem } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: '',
    tags: '',
    description: '',
    selectedFile: '',
    category : ''
  });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name}, history));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      tags: '',
      description: '',
      selectedFile: '',
      category : ''
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memmories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>

        <TextField
          value = {postData.category || ''}
          labelId="label"
          id="select"
          variant="outlined"
          label="Category"
          fullWidth
          select
          onChange={(e) => setPostData({...postData, category : e.target.value})}
        >
          <MenuItem value="Historical places">Historical places</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Souvenirs">Souvenirs</MenuItem>
        </TextField>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => {setPostData({ ...postData, selectedFile: base64 })
        }} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
