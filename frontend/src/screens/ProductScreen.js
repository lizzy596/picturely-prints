import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
//import products from '../products'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getProductById, getProducts, getReviewsById, addProductReview} from '../actions/productActions';
import { START_LOADING, END_LOADING, SET_PRODUCT_ID, SET_ERROR, END_ERROR, END_JUST_ADDED_REVIEW } from '../constants/productConstants'
import { addToCart } from '../actions/cartActions'


const ProductScreen = ({ match }) => {

//const product = products.find((p) => p._id == 1)
//const { keyword } = useParams()

//console.log(keyword)




const dispatch = useDispatch();
const navigate = useNavigate();
const { id  } = useParams()
const [qty, setQty] = useState(1)
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')
const [readMore, setReadMore] = useState(false);
const user = JSON.parse(localStorage.getItem('profile'));











const { products, isLoading, product, reviews, addedReview, error, success_message, error_message, isSearching, keyword  }  = useSelector((state) => state.productReducer);

console.log(isSearching)
console.log(keyword)





useEffect(() => {

dispatch({type: START_LOADING })

if(id) {

dispatch(getProducts())
//dispatch({type: SET_PRODUCT_ID, payload: id})
dispatch(getProductById(id))
dispatch(getReviewsById(id))
dispatch({ type: END_LOADING });
return

}

}, [])  



useEffect(() => {
    if(addedReview) {
        dispatch({type: START_LOADING })
        dispatch(getProducts())
        dispatch(getProductById(id))
        dispatch(getReviewsById(id))
        dispatch({type: END_LOADING})



    }
}, [addedReview])

useEffect(() => {
    const timer = setTimeout(() => {
        dispatch({type: END_JUST_ADDED_REVIEW })
    }, 2000);
    return () => clearTimeout(timer);
  }, [success_message]);

  

  useEffect(() => {
    const timer = setTimeout(() => {
        dispatch({type: END_ERROR })
    }, 2000);
    return () => clearTimeout(timer);
  }, [error_message]);





const addItemToCart = () => {

    dispatch({type: START_LOADING })
 
    dispatch(addToCart(id, parseInt(qty)))
    navigate('/cart')

}








const submitHandler = (e) => {
    e.preventDefault()
    dispatch({type: END_ERROR })
  
    if(!user.user_id) {
      navigate('/login')
      return
    }
    dispatch({type: START_LOADING })
    dispatch(addProductReview({product_id: product.product_id, comment, rating, user_id: user.user_id, user_name: user.first_name}, id))
    dispatch({type: END_LOADING})
    setRating(0)
    setComment('')
    

}












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
                Description: {readMore ? `${product?.description}` : `${product?.description?.substring(0, 400)}...`}
                <Button size="sm" variant="secondary" onClick={() => setReadMore(!readMore)}>
                {readMore ? 'show less' : '  read more'}
                </Button>
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

                     {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                     
                     <ListGroup.Item>
                         <Button 
                         className="btn btn-block" 
                         type="button"
                         onClick={addItemToCart}
                         disabled={product.countInStock === 0}
                         
                         >Add to Cart</Button>
                     </ListGroup.Item>
                    </ListGroup>
                    </Card>
                    </Col>
                  </Row>
                  <Row>
                      <Col md={6}>
                      <h2 className='py-3'>Reviews</h2>
                     {product.numOfReviews === 0 && <Message>No Reviews</Message>}
                     <ListGroup variant='flush'>

                    {reviews.map((review) => (
                  <ListGroup.Item key={review.user_id}>
                    <strong>{review.user_name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.created_at}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {success_message && (
                    <Message variant='success'>
                      {success_message}
                    </Message>
                  )}
                 
                  {error && (
                    <Message variant='danger'>{error_message}</Message>
                  )}


                  {user ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label className="py-1" >Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className="py-1">Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                       className="my-3"
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                
                </ListGroup.Item>





                      </ListGroup>
                      </Col>
                  </Row>

    </>
  )
}

export default ProductScreen