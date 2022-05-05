import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { START_LOADING, END_LOADING, ADMIN_END_EDIT_PRODUCT } from '../constants/productConstants'
import Loader from '../components/Loader'




const EditProductScreen = () => {

 const navigate = useNavigate()


  const { isLoading, productToEdit, editingProduct}  = useSelector((state) => state.productReducer);
  


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState()
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
   

   
   

const dispatch = useDispatch()


    const clear = () => {
      setName('')
      setPrice(0)
      setBrand('')
      setCategory('')
      setCountInStock(0)
      setDescription('')
      setImage()
};



useEffect(() => {
  if(productToEdit && editingProduct) {
    setName(productToEdit.name)
    setPrice(productToEdit.price)
    setBrand(productToEdit.brand)
    setCategory(productToEdit.category)
    setCountInStock(productToEdit.countInStock)
    setDescription(productToEdit.description)
    setImage()
    dispatch({type: END_LOADING})

  }
}, [])


const editHandler = async event => {
  event.preventDefault()
 try {

  const formData = new FormData();
    formData.append("image", image)
    formData.append("name", name)
    formData.append("price", price)
    formData.append("brand", brand)
    formData.append("category", category)
    formData.append("countInStock", countInStock)
    formData.append("description", description)

    const response = await fetch(`http://localhost:3001/admin/products/${productToEdit.product_id}`,{method: 'PUT', body: formData})
    dispatch({type: ADMIN_END_EDIT_PRODUCT })
    clear()
    navigate('/admin/products')


 } catch (error) {
  console.log(error)
 }

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
    <FormContainer>
      <h4>Edit Product</h4>
   
        <Form onSubmit={editHandler}>

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

            <Form.Group controlId='brand'>
              <Form.Label  className='my-2'>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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
            <Form.Label  className='my-2'>To change Image, upload new photo</Form.Label>
            <div className='selected_file'> 
            <Form.Control type="file" onChange={fileSelected} accept="image/*" /></div>
          </Form.Group>

         

        

         

       <Button type='submit' variant='primary' className="my-3" >
            Update Product
          </Button>
        </Form>
      
    </FormContainer>
  </>
  )
}

export default EditProductScreen



