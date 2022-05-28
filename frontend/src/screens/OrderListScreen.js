import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ImCross } from "react-icons/im"
import { allOrders } from '../actions/orderActions'
import Paginate1 from '../components/Paginate1'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pageNumber } = useParams()





  const {isLoading, errorOrders, success, success_message, error_message, orders, page, pages} = useSelector((state) => state.orderReducer)

  useEffect(() => {

    dispatch(allOrders())

  }, [])


  useEffect(() => {

    dispatch(allOrders(pageNumber))
  
  }, [pageNumber])





  if (isLoading) {
 
    return (
     <Loader />
    );
  }






  return (
    <>
      <h1>Orders</h1>
      
      {success && <Message variant='danger'>{success_message}</Message>}
        {errorOrders && <Message variant='danger'>{error_message}</Message>}
      
        {!errorOrders && <Table striped bordered hover responsive className='table-sm'>
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
        </Table>}
        <Container className="my-3 paginate justify-content-center">
          <Paginate1 pages={pages} page={page} />  
          </Container>    
      
    </>
  )
}

export default OrderListScreen