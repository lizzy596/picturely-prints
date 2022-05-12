import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import OrderScreen from './screens/OrderScreen'
import HomeScreen2 from './screens/HomeScreen2'
import ProductScreen from './screens/ProductScreen'
import ProductScreen2 from './screens/ProductScreen2'
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

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
     <main className="py-3">
       <Container>
      <Routes>
      <Route path="/" element={<HomeScreen2 />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/placeorder" element={<PlaceOrderScreen />} />
      <Route path="/homer" element={<OrderScreen />} />
      <Route path="/product/:id" element={<ProductScreen2 />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<ProductListScreen />} />
      <Route path="/admin/products/add" element={<AddProductScreen />} />
      <Route path="/admin/products/edit" element={<EditProductScreen />} />

   
       </Routes>
       </Container>

     </main>

     <Footer/>
     </BrowserRouter>
    </>
  );
}

export default App;
