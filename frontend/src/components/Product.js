import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


const Product = ({product}) => {

  const styles = {
   cardImage: {
      height: '180px',
      
    }
  }


  return (
    <>
    <Card className='my-3 p-3 rounded'>
    <Link to={`/product/${product.product_id}`}>
    <Card.Img variant="top" src={`${product.image}`} style={styles.cardImage} />
    </Link>
    <Card.Body style={{ height: '14rem'}}>
    <Link to={`/product/${product.product_id}`}>
    <Card.Title as="div" style={{ height: '5rem', marginBottom: '10px'}}> <strong>{product.name}</strong></Card.Title>
    </Link>
    <Card.Text as="div" style={{ height: '4rem',  margin: '10px 0px'  }}>
       <Rating value={product.averageRating} text={`${product.numOfReviews} reviews`} />
    
    </Card.Text>

    <Card.Text as="h3" style={{ height: '3rem' }}>${product.price}</Card.Text>
    
  </Card.Body>
</Card>
    </>
  )
}

export default Product