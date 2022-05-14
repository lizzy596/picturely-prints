import React, { useEffect, useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading }  = useSelector((state) => state.productReducer);



    useEffect(() => {

     
            dispatch(getProducts())
            
            return

        

        

      
    }, [])


   
   
   
   
   
   
   
   
   
   
    if (isLoading) {
 
        return (
         <Loader />
        );
      }
    







  return (
    <>
    <ProductCarousel />


    <h1>Latest Products</h1>
    

    <Row>
            {products.map((product) => (
              <Col  key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
    
    
    
    </>
  )
}

export default HomeScreen