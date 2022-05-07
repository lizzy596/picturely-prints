import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { END_ERROR } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'



const initialState = { first_name: '', last_name: '', email: '', password: '', confirmPassword: ''};

const RegisterScreen = ({ location, history }) => {
 // const [name, setName] = useState('')
 // const [email, setEmail] = useState('')
 // const [password, setPassword] = useState('')
  const [form, setForm] = useState(initialState);
  
 

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, error_message, loading} = useSelector((state) => state.userReducer)



  //const redirect = location.search ? location.search.split('=')[1] : '/'

  /*useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect]) */

  const submitHandler = (e) => {
    e.preventDefault()
     dispatch({type:'END_ERROR'})
      dispatch(register(form, navigate))
      
      
    
  } 

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <FormContainer>
      <h1>Sign Up</h1>
    
      {error && <Message variant='danger'>{error_message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='first_name'>
          <Form.Label className="my-2">First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter first name'
            name="first_name"
            onChange={handleChange}
           
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='last_name'>
          <Form.Label className="my-2">Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter last name'
            name="last_name"
           
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label className="my-2">Email Address</Form.Label>
          <Form.Control
            type='email'
            name="email"
            placeholder='Enter email'
        
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className="my-2">Password</Form.Label>
          <Form.Control
            type='password'
            name="password"
            placeholder='Enter password'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label className="my-2">Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name="confirmPassword"
            placeholder='Confirm password'
            onChange={handleChange}
            
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className="my-4">
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
         
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
