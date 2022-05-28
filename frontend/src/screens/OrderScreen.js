import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderById,
  payUserOrder,
  deliverUserOrder
  
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  START_LOADING, 
  END_LOADING
} from '../constants/orderConstants'




const OrderScreen = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))
  const { loadingOrders, order, orderPaid, orderDelivered }  = useSelector((state) => state.orderReducer);
//const [isDelivered, setIsDelivered] = useState(0)
  //const [isPaid, setIsPaid] = useState(0)
  const [sdkReady, setSdkReady] = useState(false)
  const [orderItems, setOrderItems] = useState([])
  const [loadingDeliver, setLoadingDeliver] = useState(false)
 //const [items, setItems] = useState([])
 const [orderId, setOrderId] = useState(id)





const style = { backgroundColor: "gray"}
 




const deliverHandler =  () => {
   dispatch(deliverUserOrder(id))

  }

useEffect(() => {
  dispatch({type: START_LOADING})
if(id) {
 
    dispatch(getOrderById(id))
    dispatch({type: END_LOADING})
}
}, [])





const successPaymentHandler = (id) =>{
   
dispatch(payUserOrder(orderId, id))
}


const handlePay = (id) => {
  dispatch(payUserOrder(id))
} 








useEffect(() => {


  const addPayPalScript = async () => {
    const API = axios.create({ baseURL: 'http://localhost:3001' });
    const { data: clientId } = await API.get('/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }


  if(order.isPaid === 0) {
    addPayPalScript()
  }

  if(orderPaid) {
    dispatch({ type: ORDER_PAY_RESET })
    dispatch(getOrderById(id))
  } 

  if(orderDelivered) {
    dispatch({ type: ORDER_PAY_RESET })
    dispatch(getOrderById(id))
  } 









}, [dispatch, loadingOrders, orderPaid, orderDelivered])  

 

  if (loadingOrders) {
 
    return (
     <Loader />
    );
  } 


  let items = [];
  let address = {};


  if(order.length > 0) {

    items = JSON.parse(order[0]?.order_items)
    address =  JSON.parse(order[0]?.shippingAddress)

  }




  //const address = JSON.parse(order[0]?.shippingAddress)


  if (!loadingOrders && order.length > 0) {
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
      <h2 className="mt-3">Order ID: {order[0]?.order_id}</h2>
      <Row className="py-3 px-3" style={{backgroundColor:'#D3D3D3'}}>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className="my-3">Shipping</h2>
              <p>
                <strong>Name: </strong> {user?.first_name} {user?.last_name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                {user?.email}
              </p>
              <p>
                <strong>Address:   </strong>
                {address?.address}, {address?.city}{' '}
                {address?.postalCode},{' '}
                {address?.country}
              </p>
              {order[0]?.isDelivered === 1 ? (
                <Message variant='success'>
                  Delivered at: {order[0]?.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="my-3">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order[0]?.paymentMethod}
              </p>
              {order[0]?.isPaid === 1 ? (
                <Message variant='success'>Paid on: {order[0].paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {items.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush' className="py-3 px-3" style={{backgroundColor:'#63666A'}}>
                  {items.map((item, index) => (
                    <ListGroup.Item key={index} >
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
                  <Col><strong>Items:</strong></Col>
                  <Col>${items.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Shipping:</strong></Col>
                  <Col>${order[0]?.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Tax:</strong></Col>
                  <Col>${order[0]?.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Total:</strong></Col>
                  <Col>${order[0]?.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order[0]?.isPaid && user.isAdmin === 0 && (
                <ListGroup.Item>
                  <PayPalButton
                      amount={order[0]?.totalPrice}
                      onSuccess={successPaymentHandler}
                    />

                   
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {user &&
                user.isAdmin === 1 &&
                order[0]?.isPaid &&
                !order[0]?.isDelivered && (
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