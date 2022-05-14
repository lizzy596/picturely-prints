import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { getTopProducts } from '../actions/productActions'


const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { topProducts, error, isLoading, error_message } = useSelector((state) => state.productReducer)

  console.log(topProducts)
  

  useEffect(() => {
    dispatch(getTopProducts())

  }, [])

  

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error_message}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {topProducts.map((product) => (
        <Carousel.Item key={product.product_id}>
          <Link to={`/product/${product.product_id}`}>
            <Image src={product.image} alt={product.name}  fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel