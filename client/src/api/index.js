import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})

// Comments
export const createComment = (userName, userId, postId, comment) => API.post('/comments', { userName, userId, postId, comment })
export const getComentsForPost = (postId) => API.get(`/comments?postId=${postId}`);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const updateComment = (id, updateComment) => API.patch(`/comments/${id}`, { updateComment });



export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchUserPosts = (id) => API.get(`/posts/userPosts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&category=${searchQuery.category}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const fetchFollowings = () => API.get('/user/followings');
export const changeFollow = (followingUserId) => API.patch('/user/changeFollow', { followingUserId });
