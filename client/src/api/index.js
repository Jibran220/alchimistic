import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5006/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchProducts = () => API.get('/products');
export const createProducts = (newPost) => API.post('/products', newPost);
export const likePost = (id) => API.patch(`/products/${id}/likePost`);
export const updateProductss = (id, updatedPost) => API.patch(`/products/${id}`, updatedPost);
export const deleteProducts = (id) => API.delete(`/products/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);