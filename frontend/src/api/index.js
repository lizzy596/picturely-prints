import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:3001' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });





export const getProducts = (pageNumber) => API.get(`/products/${pageNumber}`)
export const getTopProducts = () => API.get('/products/top')
export const getProduct = (id) => API.get(`/products/product/${id}`)
export const deleteProduct = (id) => API.delete(`/products/product/${id}`);


export const fetchProductsBySearch = (searchQuery, pageNumber) => API.get(`/products/search?searchQuery=${searchQuery}&pageNumber=${pageNumber}`);



export const getReviews = (id) => API.get(`/products/reviews/${id}`)
export const addProductReview = (value, id) => API.post(`/products/reviews/${id}`, value )
export const validateAdminStatus = () => API.get('/products/add')


export const placeOrder = (orderInfo) => API.post(`/orders`, orderInfo)
export const payOrder = (orderId, id) => API.patch(`/orders/pay/${orderId}`, id)
export const deliverOrder = (orderId) => API.patch(`/orders/deliver/${orderId}`)
export const getOrder = (id) => API.get(`/orders/${id}`)
export const getUserOrders = (id) => API.get(`/orders/${id}/user`)








export const login = (formData) => API.post('/auth/login', formData);
export const sampleLogin = (navigate) => API.post('/auth/login/sample',navigate);
export const sampleLoginAdmin = (navigate) => API.post('/auth/login/sample/admin');

export const register = (formData) => API.post('/auth/register', formData);
export const updateUserDetails = (formData) => API.patch('/auth/update', formData);

//admin Routes
export const adminEditUser = (formData) => API.patch('/auth/users', formData)
export const getAllUsers = (pageNumber) => API.get(`/auth/users/all/${pageNumber}`)

export const adminDeleteUser = (id) => API.delete(`auth/users/${id}`)
export const getAllOrders = (pageNumber) => API.get(`/orders/admin/${pageNumber}`)
