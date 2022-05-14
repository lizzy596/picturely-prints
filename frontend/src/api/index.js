import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });



API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });




//export const add_Product = ({formData}) => API.post('/admin', {formData}); 
export const getProducts = () => API.get('/products')
export const getTopProducts = () => API.get('/products/top')
export const getProduct = (id) => API.get(`/products/${id}`)
export const deleteProduct = (id) => API.delete(`/products/${id}`);



export const getReviews = (id) => API.get(`/products/reviews/${id}`)
export const addProductReview = (value, id) => API.post(`/products/reviews/${id}`, value )



export const placeOrder = (orderInfo) => API.post(`/orders`, orderInfo)
export const getRecentOrder = (id) => API.get(`/orders/${id}`)








export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);