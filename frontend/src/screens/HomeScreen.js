import React, { useEffect, useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import { Row, Col, Button, Container } from 'react-bootstrap'
import SearchBox from '../components/SearchBox'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate'
import { useNavigate, useParams } from 'react-router-dom';
import { END_SEARCH, START_SEARCH, START_LOADING, END_LOADING } from '../constants/productConstants'
import { getProducts, getProductsBySearch } from '../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { keyword } = useParams()
    const { products, isLoading, isSearching, page, pages }  = useSelector((state) => state.productReducer);

  

    const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));

    const { pageNumber } = useParams()

    console.log(pageNumber)

   



  useEffect(() => {

    if(searchTerm) {

      dispatch({type: START_LOADING})
     
      dispatch({type: START_SEARCH })
      dispatch(getProductsBySearch(searchTerm, pageNumber))
      return
    
    }

  }, [pageNumber])
 





  useEffect(() => {

  if(searchTerm) {
     
    dispatch({type: START_SEARCH })
    dispatch(getProductsBySearch(searchTerm, pageNumber))
    return
  } else {
   
    dispatch(getProducts(pageNumber))
      return

  }
}, [searchTerm, pageNumber])


const viewAllProducts = () => {
  dispatch({type: START_LOADING})
  localStorage.removeItem('searchTerm');
  dispatch({type:END_SEARCH})
  dispatch({type: END_LOADING})

  navigate('/')

}


//console.log(keyword)





   
   
   
   
   
   
   
   
   
   
    if (isLoading) {
 
        return (
         <Loader />
        );
      }
    







  return (
    <>

<Row >
  <Container className="search-container justify-content-center">
<SearchBox className="justify-content-center" />
</Container>
</Row>

{!isSearching  && pageNumber == 1 && ( <><h1 className="my-3">Top Rated Products</h1>
    <ProductCarousel /> </>)}
    


 
    {!isSearching ? <h3 className="my-3">All Products</h3> : <h3 className="my-3">Search Results For: '{searchTerm}'</h3> }
    {isSearching && <Button onClick={viewAllProducts}>Back to all products</Button> }

   
    <Row>
            {products.map((product) => (
              <Col  key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Container className="my-3 paginate justify-content-center">
          <Paginate 
            pages={pages}
            page={page}
            keyword={searchTerm ? searchTerm : ''}
          />
          </Container>
        
    
    
    </>
  )
}

export default HomeScreen