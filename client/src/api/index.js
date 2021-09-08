import axious from 'axios';

const URL = 'http://localhost:8000';

export const fetchPosts = () => axious.get(`${URL}/posts/`);
export const createPost = (payload) => axious.post(`${URL}/posts/`, payload);
export const updatePost = (payload) => axious.patch(`${URL}/posts/${payload.id}/`, payload);
export const deletePost = (payload) => axious.delete(`${URL}/posts/${payload.id}/`, payload);
export const fetchComments = (payload) => axious.get(`${URL}/posts/${payload.id}/comment/`, payload);
export const createComment = (payload) => axious.post(`${URL}/comment/`, payload);
export const deleteComment = (payload) => axious.delete(`${URL}/comment/${payload.id}/`, payload);
export const loadMorePost = (payload) => axious.get(`${URL}/posts/?page=${payload}`);