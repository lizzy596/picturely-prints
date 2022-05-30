
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { addProduct, validateAdminTrue } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { JUST_ADDED_PRODUCT, START_LOADING, END_LOADING, SET_ERROR, END_ERROR} from '../constants/productConstants'
import Loader from '../components/Loader'




const AddProductScreen = () => {


  const { products, isLoading, justAddedProduct, adminError, adminErrorMessage }  = useSelector((state) => state.productReducer);
  

    const [error, setError] = useState(false)
    const [ errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState()
    const [artist, setArtist] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const navigate = useNavigate();

   
   

const dispatch = useDispatch()

    const clear = () => {
      setName('')
      setPrice(0)
      setArtist('')
      setCategory('')
      setCountInStock(0)
      setDescription('')
      setImage()
};




useEffect(() => {
   dispatch(validateAdminTrue())
}, [])





const submitHandler = async event => {
  event.preventDefault()
  setError(false)
  setErrorMessage('')

  if(!name|| !image || !price|| !artist || !category || !countInStock || !description  ) {
    setError(true)
    setErrorMessage('All fields must be completed!')
 
  return
  }

  try {


    const formData = new FormData();
    formData.append("image", image)
    formData.append("name", name)
    formData.append("price", price)
    formData.append("artist", artist)
    formData.append("category", category)
    formData.append("countInStock", countInStock)
    formData.append("description", description)
  
  
  const response = await fetch('https://picturely-prints.herokuapp.com/products/add',{method: 'POST', headers: new Headers({
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    
}), body: formData})

  const data = await response.json()

 dispatch({type: JUST_ADDED_PRODUCT })
 dispatch({type: START_LOADING})

  clear()

  navigate('/admin/products/1')
} catch (err) {

  
 console.log(err)

}

/*navigate('/admin')*/
 
} 
















const fileSelected = event => {
const file = event.target.files[0]
setImage(file)
}



if (isLoading) {
 
  return (
   <Loader />
  );
}








  return (
    <>
    <Link to='/admin/products' className='btn btn-light my-3'>
      Go Back
    </Link>

    {adminError && <Message variant='danger'>{adminErrorMessage}</Message>}
    {!adminError &&<FormContainer>
      <h4>Add New Product</h4>
      {error && <Message variant='danger'>{errorMessage}</Message>}
   
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label  className='my-2'>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              name="name"
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
              <Form.Label  className='my-2'>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='artist'>
              <Form.Label  className='my-2'>Artist</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter artist'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label  className='my-2'>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label  className='my-2'>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label  className='my-2'>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            
          <Form.Group controlId='image'>
            <Form.Label  className='my-2'>Image</Form.Label>
            <div className='selected_file'> 
            <Form.Control type="file" onChange={fileSelected} accept="image/*" /></div>
          </Form.Group>

         

        

         

      


         

         

         
          <Button type='submit' variant='primary' className="my-3">
            Add Product
          </Button>
        </Form>
      
    </FormContainer>}
  </>
  )
}

export default AddProductScreen



