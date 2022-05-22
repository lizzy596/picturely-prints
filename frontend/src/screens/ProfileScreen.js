import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserDetail } from '../actions/userActions'
import { getUserOrdersById  } from '../actions/orderActions'
import { END_ERROR, END_SUCCESS, LOG_OUT } from '../constants/userConstants'
import { START_LOADING, END_LOADING } from '../constants/orderConstants'
import { ImCross } from "react-icons/im"
import { useNavigate } from 'react-router-dom'
//import { getUserDetails, updateUserProfile } from '../actions/userActions'
//import { listMyOrders } from '../actions/orderActions'
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate()




  const [id, setId] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()

  const { error, success, error_message, success_message, isLoading }  = useSelector((state) => state.userReducer);
  const { orders, loadingOrders, errorOrders }  = useSelector((state) => state.orderReducer);


useEffect(() => {


  if(!user.user_id) {
    navigate('/login')
    return
  }

  if(user) {
    setId(user.user_id)
    setEmail(user.email)
    setFirstName(user.first_name)
    setLastName(user.last_name)
  }


 
 


  dispatch(getUserOrdersById(user.user_id))
  dispatch({type: END_LOADING})

}, [])



useEffect(() => {
  const timer = setTimeout(() => {

    dispatch({type: END_SUCCESS})
    
  }, 2000);
  return () => clearTimeout(timer);
}, [success]);


const productDetails = () => {

  dispatch({type: START_LOADING})
 

}






  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({type: END_ERROR})
    dispatch(updateUserDetail({id, firstName, lastName, password, confirmPassword, email}))
    setPassword('')
    setConfirmPassword('')

  }

  const logOut = () => {
    dispatch({type: LOG_OUT})
    navigate('/page/1')
  }



     
  if (isLoading || loadingOrders) {
 
    return (
     <Loader />
    );
  }

  return (
    <Row>
      <Col md={3}>
        <h2 className="my-5">User Profile</h2>
       
        {success && <Message variant='success'>{success_message}</Message>}
        {error && <Message variant='danger'>{error_message}</Message>}
      
        
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='first_name' className="my-3">
              
              <Form.Control
                type='name'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='last_name' className="my-3">
              
              <Form.Control
                type='name'
                placeholder='Enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

           
           
           
           
           
            <Form.Group controlId='email' className="my-3">
              
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="my-3">
            
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className="my-3">
            
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Profile
            </Button>

           
          </Form>

          <Button  variant='danger' onClick={logOut} size="lg" className="my-5">
              Logout
            </Button>
        
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
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
                      <Button  onClick={productDetails}className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen