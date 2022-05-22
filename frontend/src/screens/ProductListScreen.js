
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProducts, deleteProduct } from '../actions/productActions';
import { JUST_ADDED_PRODUCT, START_LOADING, END_JUST_ADDED_PRODUCT, ADMIN_DELETE_PRODUCT, ADMIN_END_DELETE_PRODUCT, ADMIN_EDIT_PRODUCT, ADMIN_END_EDIT_PRODUCT, END_JUST_EDITED_PRODUCT  } from '../constants/productConstants'
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai"
import Paginate from '../components/Paginate'


const ProductListScreen = ({history, match}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const { products, isLoading, justAddedProduct, deletingProduct, justEditedProduct, page, pages, error, error_message}  = useSelector((state) => state.productReducer);
  const { pageNumber } = useParams()

  


const createProductHandler = () => {
  navigate('/admin/products/add')
  
}

const deleteHandler = (id) => {
 
  dispatch(deleteProduct(id))
  dispatch({type: ADMIN_DELETE_PRODUCT})
  navigate('/admin/products/1')
}

const editHandler = (id) => {
  dispatch({type: START_LOADING})

  dispatch({type: ADMIN_EDIT_PRODUCT, payload: id})
  navigate('/admin/products/edit')

}

useEffect(() => {

  dispatch(getProducts(pageNumber))

}, [])



useEffect(() => {

  dispatch(getProducts(pageNumber))

}, [pageNumber])


useEffect(() => {

  dispatch(getProducts(pageNumber))

}, [page, pages])





useEffect(() => {

  if(justAddedProduct) {
    dispatch(getProducts(pageNumber))
    dispatch({type: END_JUST_ADDED_PRODUCT})
    return
} 
if(justEditedProduct) {
  dispatch(getProducts(pageNumber))
  dispatch({type: END_JUST_EDITED_PRODUCT})
  
} 
if(isLoading){
dispatch(getProducts(pageNumber))
}
if(deletingProduct) {
  dispatch(getProducts(pageNumber))
  dispatch({type: ADMIN_END_DELETE_PRODUCT})
}
 

}, [isLoading, justAddedProduct, deletingProduct, justEditedProduct])


if (isLoading) {
 
  return (
   <Loader />
  );
}


const style = { color: "green", fontSize: "1.5em" }
const style1 = { color: "red", fontSize: "1.5em" }




  return (
    <>
     <Row className='align-items-center'>
        <Col className='my-4'>

        <Button className='my-3' onClick={createProductHandler}>
            <AiOutlinePlus /> Create Product
          </Button>

          {error && <Message variant='danger'>{error_message}</Message>}

          <h1>Products</h1>
          
        </Col>
       
      </Row>
      <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    
                      <Button variant='light' className='btn-sm'>
                        <FaRegEdit style={style} onClick={() => editHandler(product.product_id)} />
                      </Button>
                 
                   </td>
                   <td>
                    <AiFillDelete style={style1} onClick={() => deleteHandler(product.product_id)} />
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Container className="my-3 paginate justify-content-center">
          <Paginate pages={pages} page={page} isAdmin={true} />  
          </Container>    
    </>
  )
}

export default ProductListScreen