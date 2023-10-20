import axios from 'axios';

const API = 'http://localhost:9000/api';

export const getPostsRequest = (query) => axios.get(`${API}/posts/?q=${query}`);

export const getPostRequest = (id) => axios.get(`${API}/posts/${id}`);

export const createPostRequest = (post) => axios.post(`${API}/posts`, post);
