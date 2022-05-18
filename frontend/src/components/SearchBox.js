import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySearch } from '../actions/productActions'

const SearchBox = ({ history }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
   
    if (keyword.trim()) {
      dispatch(getProductsBySearch(keyword))
      navigate(`/${keyword}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='search-form'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='success' className='p-2 mx-3'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox