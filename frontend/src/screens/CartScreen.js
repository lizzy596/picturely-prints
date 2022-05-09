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
import { START_LOADING, END_LOADING } from '../constants/productConstants'

const CartScreen = ({ match, location, history }) => {
  //const productId = match.params.id

 // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cartReducer)
  const { isLoading } = useSelector((state) => state.productReducer)

  let [cartItemsLocal, setCartItemsLocal] = useState(JSON.parse(localStorage.getItem("cartItems")))



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
    history.push('/login?redirect=shipping')
  } 

 
const style1 = { color: "red", fontSize: "1.5em" , marginLeft: '30px'}



if (isLoading) {
 
    return (
     <Loader />
    );
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItemsLocal === null ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItemsLocal.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
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
                  <Col md={2}>
                   

                    <ImCross style={style1} onClick={() => removeFromCartHandler(item.product)} />
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
              $
              {cartItemsLocal
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>}
    </Row>
  )
}

export default CartScreen