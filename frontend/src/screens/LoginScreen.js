import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { END_ERROR } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/userActions'

const initialState = { email: '', password: '' };

const LoginScreen = ({ location, history }) => {
  const [form, setForm] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  //const userLogin = useSelector((state) => state.userLogin)
  //const { error, loading, userInfo} = useSelector((state) => state.userReducer)

  const userLogin = useSelector((state) => state.userLogin)
  const { error, error_message, loading} = useSelector((state) => state.userReducer)
  //const { loading, error, userInfo } = userLogin

 //const redirect = location.search ? location.search.split('=')[1] : '/'

 /* useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect]) */

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({type:'END_ERROR'})
    dispatch(login(form, navigate))
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error_message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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


        <Button type='submit' variant='primary' className="my-4">
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen