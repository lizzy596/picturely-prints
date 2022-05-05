import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import AdminProductList from './screens/AdminProductList'
import ProductListScreen from './screens/ProductListScreen'
import AddProductScreen from './screens/AddProductScreen'
import EditProductScreen from './screens/EditProductScreen'
import AdminDashboard from './screens/AdminDashboard'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
     <main className="py-3">
       <Container>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
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
