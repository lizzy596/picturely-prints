import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import OrderScreen from './screens/OrderScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import AdminProductList from './screens/AdminProductList'
import PaymentScreen from './screens/PaymentScreen'
import ProductListScreen from './screens/ProductListScreen'
import AddProductScreen from './screens/AddProductScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import EditProductScreen from './screens/EditProductScreen'
import AdminDashboard from './screens/AdminDashboard'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductCarousel from './components/ProductCarousel'


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {


  let user = JSON.parse(localStorage.getItem('profile'));

  console.log(user)

useEffect(() => {
 user = JSON.parse(localStorage.getItem('profile'));
}, [])

  






  return (
    <>
    <BrowserRouter>
    <Header />
     <main className="py-3">
       <Container>
      <Routes>

      
      <Route path="/" element={<HomeScreen />} />
      <Route path="/:keyword" element={<HomeScreen />} />
     
      <Route path="/carousel" element={<ProductCarousel />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/placeorder" element={<PlaceOrderScreen />} />
      <Route path="/order/:id" element={<OrderScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/admin" element={user?.isAdmin === 1 ? <AdminDashboard /> : <Navigate to='/' /> } />
      <Route path="/admin/products" element={user?.isAdmin === 1 ? <ProductListScreen /> : <Navigate to='/' /> } />
      <Route path="/admin/products/add" element={user?.isAdmin === 1 ? <AddProductScreen /> : <Navigate to='/' /> } />
      <Route path="/admin/products/edit" element={user?.isAdmin === 1 ? <EditProductScreen /> : <Navigate to='/' /> } />
      <Route path="/admin/users/" element={user?.isAdmin === 1 ? <UserListScreen /> : <Navigate to='/' /> } />
      <Route path="/admin/users/edit" element={user?.isAdmin === 1 ? <UserEditScreen /> : <Navigate to='/' /> } />
      <Route path="/admin/orders" element={user?.isAdmin === 1 ? <OrderListScreen /> : <Navigate to='/' /> } />
      
     

   
       </Routes>
       </Container>

     </main>

     <Footer/>
     </BrowserRouter>
    </>
  );
}

export default App;
