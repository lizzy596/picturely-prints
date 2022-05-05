import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../actions/productActions';
import Loader from '../components/Loader'
import { START_LOADING, END_LOADING, END_JUST_ADDED_PRODUCT } from '../constants/productConstants';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'



const AdminProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading, justAddedProduct}  = useSelector((state) => state.productReducer);

   



    useEffect(() => {

        if(justAddedProduct) {
            dispatch(getProducts())
            dispatch({type: END_JUST_ADDED_PRODUCT})
            return

        }

        

      
    }, [])



    
 if (isLoading) {
 
    return (
     <Loader />
    );
  }







  return (
      <>
       <h4>AdminProductList</h4>

       {products.map((item) => {
           return (
               <div key={item.product_id}>
               <h3>{item.name}</h3>
               <h3>{item.price}</h3>
               <Image src={item.image} className='img-thumbnail' width={'100px'}/>
               </div>
           )
       })}

     
      
      </>



   
  )
}

export default AdminProductList