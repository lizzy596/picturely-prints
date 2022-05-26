
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProducts, deleteProduct, validateAdminTrue } from '../actions/productActions';
import { JUST_ADDED_PRODUCT, START_LOADING, END_SUCCESS, END_JUST_ADDED_PRODUCT, ADMIN_DELETE_PRODUCT, ADMIN_END_DELETE_PRODUCT, ADMIN_EDIT_PRODUCT, ADMIN_END_EDIT_PRODUCT, END_JUST_EDITED_PRODUCT  } from '../constants/productConstants'
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai"
import Paginate from '../components/Paginate'


const ProductListScreen = ({history, match}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const { products, isLoading, justAddedProduct, deletingProduct, justEditedProduct, page, pages, error, error_message, adminError, adminErrorMessage, success, success_message}  = useSelector((state) => state.productReducer);
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
  dispatch(validateAdminTrue())
  dispatch(getProducts(pageNumber))

}, [])



useEffect(() => {
  dispatch(validateAdminTrue())
  dispatch(getProducts(pageNumber))

}, [pageNumber])


useEffect(() => {
  dispatch(validateAdminTrue())
  dispatch(getProducts(pageNumber))

}, [page, pages])

useEffect(() => {
  const timer = setTimeout(() => {

    dispatch({type: END_SUCCESS})
    
  }, 2000);
  return () => clearTimeout(timer);
}, [success]);





useEffect(() => {

  if(justAddedProduct) {
    dispatch(validateAdminTrue())
    dispatch(getProducts(pageNumber))
    dispatch({type: END_JUST_ADDED_PRODUCT})
    return
} 
if(justEditedProduct) {
  dispatch(validateAdminTrue())
  dispatch(getProducts(pageNumber))
  dispatch({type: END_JUST_EDITED_PRODUCT})
  
} 
if(isLoading){
  dispatch(validateAdminTrue())
dispatch(getProducts(pageNumber))
}
if(deletingProduct) {
  dispatch(validateAdminTrue())
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
        {adminError && <Message variant='danger'>{adminErrorMessage}</Message>}
        {error && <Message variant='danger'>{error_message}</Message>}

         {!adminError && <Button className='my-3' onClick={createProductHandler}>
            <AiOutlinePlus /> Create Product
          </Button>}

          {success && <Message variant='success'>{success_message}</Message>}

           {!adminError && <h1>Products</h1>}
          
        </Col>
       
      </Row>
       {!adminError && <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>ARTIST</th>
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
                  <td>{product.artist}</td>
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
          </Table>}
          <Container className="my-3 paginate justify-content-center">
         {!adminError && <Paginate pages={pages} page={page} isAdmin={true} />}
          </Container>    
    </>
  )
  }

export default ProductListScreen