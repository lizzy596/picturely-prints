import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });



API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });





export const getProducts = () => API.get('/products')
export const getTopProducts = () => API.get('/products/top')
export const getProduct = (id) => API.get(`/products/${id}`)
export const deleteProduct = (id) => API.delete(`/products/${id}`);


export const fetchProductsBySearch = (searchQuery) => API.get(`/products/search?searchQuery=${searchQuery}`);



export const getReviews = (id) => API.get(`/products/reviews/${id}`)
export const addProductReview = (value, id) => API.post(`/products/reviews/${id}`, value )



export const placeOrder = (orderInfo) => API.post(`/orders`, orderInfo)
export const getOrder = (id) => API.get(`/orders/${id}`)
export const getUserOrders = (id) => API.get(`/orders/${id}/user`)








export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const updateUserDetails = (formData) => API.patch('/auth/update', formData);

//admin Routes

export const getAllUsers = () => API.get('/auth/users')
export const adminEditUser = (formData) => API.patch('/auth/users', formData)
export const adminDeleteUser = (id) => API.delete(`auth/users/${id}`)
export const getAllOrders = () => API.get('/orders/admin')
