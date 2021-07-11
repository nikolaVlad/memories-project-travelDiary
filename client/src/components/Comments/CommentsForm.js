/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import React, { useEffect } from 'react';
import { TextField, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { createComment, getComentsForPost, deleteComment, newComment, updateComment } from '../../api';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const CommentsForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const [allComments, setAllComments] = useState('');
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState(false);

  useEffect(() => {
    handleGetCommentsForPost();
  }, [postId]);

  function handleSubmit(e) {
    e.preventDefault();
    if (comment.length === 0) {
      return alert('Comment field cannot be blank. Please insert comment. ');
    }

    createComment(user.result.name, user.result._id, postId, comment);
    setComment('');
    handleGetCommentsForPost();
  }

  useEffect(() => {
    handleGetCommentsForPost();
  }, [allComments]);

  async function handleGetCommentsForPost() {
    let data = await getComentsForPost(postId);
    setAllComments(data.data.data);
    return data;
  }

  async function hadnleDeleteComment(commentId) {
    await deleteComment(commentId);
    await handleGetCommentsForPost();
  }

  async function handleUpdateComment(commentId, newComment) {
    updateComment(commentId, newComment);
    handleGetCommentsForPost();
    setOpen(false);
  }

  return (
    <div>
      <h5>Comments : </h5>
      {(user && (
        <form autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)}>
          <TextField
            value={comment}
            labelId="label"
            variant="filled"
            label="Type comment here..."
            fullWidth
            multiline
            rows="5"
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" style={{ margin: '20px 0px' }} variant="outlined" size="small" color="primary">
            Add comment
          </Button>
        </form>
      )) || (
        <h5 style={{ color: 'gray' }}>
          <NavLink to="/auth">Log in</NavLink> and post comments :){' '}
        </h5>
      )}

      <Divider style={{ margin: '20px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {allComments.length > 0 ? (
          allComments.slice().map((comment) => {
            return (
              <div style={{ padding: '20px 0px' }}>
                <div>{comment.creatorName}</div>
                <small style={{ color: 'gray', display: 'flex', justifyContent: 'space-between' }}>
                  {comment.createdAt.slice(0, 10)}

                  {user?.result?._id === comment.creator && (
                    <>
                      <span>
                        <Button
                          onClick={(e) => {
                            setOpen(true);
                            setNewComment(comment.content);
                          }}
                        >
                          <EditIcon style={{ fontSize: '18px', color: 'darkblue' }} />
                        </Button>
                        |
                        <Button onClick={(e) => hadnleDeleteComment(comment._id)}>
                          <DeleteIcon style={{ fontSize: '18px', color: 'red' }} />
                        </Button>
                      </span>
                      <Dialog open={open} onClose={null} aria-labelledby="form-dialog-title" fullWidth>
                        <DialogTitle id="form-dialog-title">Change comment</DialogTitle>
                        <DialogContent>
                          <TextField autoFocus margin="dense" value={newComment} onChange={(e) => setNewComment(e.target.value)} fullWidth multiline />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={(e) => {
                              setOpen(false);
                            }}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button onClick={(e) => handleUpdateComment(comment._id, newComment)} color="primary">
                            Apply
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </small>
                <div>
                  <br></br>
                </div>
                <div>{comment.content}</div>
                <hr style={{ backgroundColor: 'gray', opacity: '0.2' }} />
              </div>
            );
          })
        ) : (
          <p>No comments for this post!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
