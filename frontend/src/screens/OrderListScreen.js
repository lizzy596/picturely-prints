import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ImCross } from "react-icons/im"
import { allOrders } from '../actions/orderActions'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const {isLoading, error, success, success_message, error_message, orders} = useSelector((state) => state.orderReducer)

  useEffect(() => {

    dispatch(allOrders())

  }, [])

  /*const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo]) */



  if (isLoading) {
 
    return (
     <Loader />
    );
  }






  return (
    <>
      <h1>Orders</h1>
      
      {success && <Message variant='danger'>{success_message}</Message>}
        {error && <Message variant='danger'>{error_message}</Message>}
      
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.created_at}</td>
                <td>${order.totalPrice}.00</td>
                <td>
                    {order.isPaid === 1 ? (
                      <p>paid</p>
                    ) : (
                     
                    <ImCross style={{ color: 'red' }}/> 
                    )}
                  </td>
                  <td>
                    {order.isDelivered === 1 ? (
                      <p>order delivered</p>
                    ) : (
                      <ImCross style={{ color: 'red' }}/> 
                    )}
                  </td>
                <td>
                  <LinkContainer to={`/order/${order.order_id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </>
  )
}

export default OrderListScreen