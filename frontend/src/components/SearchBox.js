import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SET_KEYWORD } from '../constants/productConstants';
import { getProductsBySearch } from '../actions/productActions'

const SearchBox = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState(null)




  const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));

useEffect(()=> {
  if(!searchTerm) {
    setKeyword(null)
  }

}, [])


const clear = () => {
  setKeyword(null)
}


  const submitHandler = (e) => {
    e.preventDefault()
   
    if (keyword.trim()) {

      //dispatch({ type: SET_KEYWORD, payload: keyword})
      localStorage.setItem('searchTerm', JSON.stringify(keyword));
      dispatch(getProductsBySearch(keyword))
      clear()
      //navigate(`/${keyword}`)
      navigate('/')
    
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