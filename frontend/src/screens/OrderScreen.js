import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getMostRecentOrder,
  
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = () => {


 

  const dispatch = useDispatch()

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
  const user = JSON.parse(localStorage.getItem('profile'))
  const { isLoading, order }  = useSelector((state) => state.orderReducer);




  

  const [isDelivered, setIsDelivered] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [orderItems, setOrderItems] = useState([])
  const [loadingDeliver, setLoadingDeliver] = useState(false)



  const deliverHandler =  () => {

  }

 

  if (isLoading) {
 
    return (
     <Loader />
    );
  } 


  const items = JSON.parse(order[0].order_items)
  const address = JSON.parse(order[0].shippingAddress)


  if (!isLoading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    items.itemsPrice = addDecimals(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }










  return  (
 
    <>
      <h1>Order ID: {order[0].order_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {user.User.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                {user.User.email}
              </p>
              <p>
                <strong>Address:   </strong>
                {address.address}, {address.city}{' '}
                {address.postalCode},{' '}
                {address.country}
              </p>
              {order[0].isDelivered ? (
                <Message variant='success'>
                  Delivered on delivery time
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order[0].paymentMethod}
              </p>
              {order[0].isPaid ? (
                <Message variant='success'>Paid on date order paid</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {items.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {items.map((item, index) => (
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
                  <Col>{items.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order[0].shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order[0].taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order[0].totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!isPaid && (
                <ListGroup.Item>
                 <Button>PayPal Button</Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {user &&
                user.User.isAdmin === 1 &&
                isPaid &&
                !isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen