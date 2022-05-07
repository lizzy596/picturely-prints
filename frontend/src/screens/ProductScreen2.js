import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
//import products from '../products'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getProductById, getProducts } from '../actions/productActions';
import { START_LOADING, END_LOADING, SET_PRODUCT_ID } from '../constants/productConstants'


const ProductScreen2 = ({ match }) => {

//const product = products.find((p) => p._id == 1)






const dispatch = useDispatch();
const navigate = useNavigate();
const { id  } = useParams()









const { products, isLoading, product  }  = useSelector((state) => state.productReducer);
useEffect(() => {

dispatch({type: START_LOADING })

if(id) {

dispatch(getProducts())
//dispatch({type: SET_PRODUCT_ID, payload: id})

dispatch(getProductById(id))
dispatch({ type: END_LOADING });
return

}







}, [])  





/*useEffect(() => {
    dispatch({type: START_LOADING})
    setProduct(products.find((item) => item.product_id == id))
    console.log(product)
    dispatch({type: END_LOADING})

}, []) */















if (isLoading) {
 
    return (
     <Loader />
    );
  }



  return (
      <>
      <Link className="btn btn-dark my-3" to="/">Go Back</Link>

     

      <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating
                value={product.averageRating}
                    text={`${product.numOfReviews} reviews`}
                    />
                </ListGroup.Item>

                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>

            </ListGroup>
         </Col>

         <Col md={3}>
             <Card>
                 <ListGroup variant="flush">
                     <ListGroup.Item>
                         <Row>
                             <Col>
                                Price:
                             </Col>
                             <Col>
                             <strong>${product.price}</strong>
                             </Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <Row>
                             <Col>
                                Status:
                             </Col>
                             <Col>
                             {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                             </Col>
                         </Row>
                     </ListGroup.Item>

                     
                     <ListGroup.Item>
                         <Button 
                         className="btn btn-block" 
                         type="button"
                         disabled={product.countInStock === 0}
                         
                         >Add to Cart</Button>
                     </ListGroup.Item>


                 </ListGroup>
             </Card>


         </Col>


      </Row>

    </>
  )
}

export default ProductScreen2