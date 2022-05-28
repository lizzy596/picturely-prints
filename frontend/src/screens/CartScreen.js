import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { START_LOADING, END_LOADING } from '../constants/productConstants'

const CartScreen = ({ match, location, history }) => {


  const navigate = useNavigate()

  //const productId = match.params.id

 // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cartReducer)
  const { isLoading } = useSelector((state) => state.productReducer)

  let [cartItemsLocal, setCartItemsLocal] = useState(JSON.parse(localStorage.getItem("cartItems")))

  const user = JSON.parse(localStorage.getItem('profile'))







useEffect(() => {

    dispatch({type: START_LOADING })
setCartItemsLocal(JSON.parse(localStorage.getItem("cartItems")))
dispatch({type: END_LOADING })
}, [cartItems])





useEffect(() => {

dispatch({type: START_LOADING })
setCartItemsLocal(JSON.parse(localStorage.getItem("cartItems")))
dispatch({type: END_LOADING })
}, [])





  

 

  /*useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]) */

  const removeFromCartHandler = (id) => {

   
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if(!user?.user_id) {

      navigate('/login')
      return

    } else {

      navigate('/shipping')
      return

    }

    
  } 

  const continueShoppingHandler = () => {
    navigate('/')
  }

 
const style1 = { color: "red", fontSize: "1.5em" , marginLeft: '30px'}



if (isLoading) {
 
    return (
     <Loader />
    );
  }

  return (
    <Row  className="mt-3">
      <Col md={8}>
        <h1 className="mt-3">Shopping Cart</h1>
        {cartItemsLocal === null ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItemsLocal.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="cart-row">
                  <Col xs={2} md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col xs={2} md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col xs={3} md={2}>${item.price}</Col>
                  <Col xs={3} md={2} className="cart-col">
                    <Form.Control
                      as='select'
                   
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs={2} md={2}>
                   

                    <AiFillDelete style={style1} onClick={() => removeFromCartHandler(item.product)} />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      { cartItemsLocal && <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItemsLocal.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <h5 className="py-2">
              Total: $
              {cartItemsLocal
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
                </h5>
            </ListGroup.Item>
            <ListGroup.Item className="cart-screen-buttons">
              <Button
                type='button'
                className='btn-block'
                style={{backgroundColor: 'black', border: 'none'}}

                disabled={cartItemsLocal.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>

              <Button
                type='button'
                className='btn-block'
                variant="primary"
                className="my-3"
                
                onClick={continueShoppingHandler}
              >
                Continue Shopping
              </Button>
          
             
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>}
    </Row>
  )
}

export default CartScreen