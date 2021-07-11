import * as api from '../api/index.js';

export const createComment = async() => 
{
    await api.createComment();
}

export const getComentsForPost = async (postId) =>
{
    await api.getComentsForPost(postId);
}

export const deleteComment = async () =>
{
    await api.deleteComment();
}