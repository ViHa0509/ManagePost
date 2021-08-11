import axious from 'axios';

const URL = 'http://localhost:8000';

export const fetchPosts = () => axious.get(`${URL}/posts/`);
// export const fetchPosts = () => axious.get(`https://mocki.io/v1/1bb8340a-cb6c-43c9-9f5b-2003aaf3d378`);
export const createPost = (payload) => axious.post(`${URL}/posts/`, payload);
export const updatePost = (payload) => axious.patch(`${URL}/posts/${payload.id}/`, payload);
// export const updatePost = (payload) => axious.patch(`https://mocki.io/v1/1bb8340a-cb6c-43c9-9f5b-2003aaf3d378`, payload);
export const deletePost = (payload) => axious.delete(`${URL}/posts/${payload.id}/`, payload);