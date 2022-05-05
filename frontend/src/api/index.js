import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });



API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });




//export const add_Product = ({formData}) => API.post('/admin', {formData}); 
export const getProducts = () => API.get('/admin/products')
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);








export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);