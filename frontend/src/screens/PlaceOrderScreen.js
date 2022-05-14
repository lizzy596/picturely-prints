import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { addOrder, getMostRecentOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const address = JSON.parse(localStorage.getItem('shippingAddress'))
  const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
  const cartItemsLocal = JSON.parse(localStorage.getItem('cartItems'))


  const cartItems = localStorage.getItem('cartItems')
  const shippingAddress = localStorage.getItem('shippingAddress')











  

  const user = JSON.parse(localStorage.getItem('profile'))



  const [userId, setUserId] = useState(user?.user_id)

  console.log(userId)


  //const { cartItems }  = useSelector((state) => state.cartReducer)

   const { error }  = useSelector((state) => state.orderReducer)

  //const cart = useSelector((state) => state.cart)



  if (!address) {
    navigate('/shipping')
  } else if (!paymentMethod) {
    navigate('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let itemsPrice = addDecimals(
    cartItemsLocal.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  
  let shippingPrice = addDecimals(itemsPrice > 100 ? 0.00 : 100.00)

  let taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))

let totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)





  

  //const orderCreate = useSelector((state) => state.orderCreate)
 // const { order, success, error } = orderCreate

  /*useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success]) */

  /*const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  } */


const placeOrderHandler = () => {

  

dispatch(addOrder({userId, cartItems, shippingAddress, paymentMethod, totalPrice, taxPrice, shippingPrice }))
}


const recentOrderHandler = () => {

  dispatch(getMostRecentOrder(userId))
  navigate('/homer')

}



  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className="py-3">
              <h2 >Shipping</h2>
              <p>
                <strong>Address:  </strong>
                {address.address}, {address.city}{' '}
                {address.postalCode},{' '}
                {address.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2>Order Items</h2>
              {cartItemsLocal.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItemsLocal.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItemsLocal === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>


                <Button
                  type='button'
                  className='btn-block'
                  className="my-3"
                  
                  onClick={recentOrderHandler}
                >
                  Get Most Recent Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen