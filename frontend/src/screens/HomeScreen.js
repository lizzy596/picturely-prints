import React, { useEffect, useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { END_SEARCH } from '../constants/productConstants'
import { getProducts, getProductsBySearch } from '../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword } = useParams()
    const { products, isLoading, isSearching}  = useSelector((state) => state.productReducer);



    useEffect(() => {

  if(keyword && isSearching) {
    dispatch(getProductsBySearch(keyword))
    return
  } else {

    dispatch(getProducts())
      return

  }




    
}, [])


const viewAllProducts = () => {
  
  dispatch({type:END_SEARCH})
  navigate('/')

}




   
   
   
   
   
   
   
   
   
   
    if (isLoading) {
 
        return (
         <Loader />
        );
      }
    







  return (
    <>

{!isSearching && <><h1 className="my-3">Top Rated Products</h1>
    <ProductCarousel /> </>}
    


 
    {!isSearching ? <h3 className="my-3">All Products</h3> : <h3 className="my-3">Search Results For: {keyword}</h3> }
    {isSearching && <Button onClick={viewAllProducts}>Back to all products</Button> }

   
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