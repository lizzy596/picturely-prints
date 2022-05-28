import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  //const cart = useSelector((state) => state.cart)
  //const { shippingAddress } = cart

  const navigate = useNavigate()

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))





  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 counter={2} />
      <h1 className="my-3">Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          
          <Form.Control
            type='text'
            placeholder='Enter mailing address'
            value={address}
            className="my-3"
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
         
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            className="my-3"
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
         
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            className="my-3"
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            className="my-3"
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className="my-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen