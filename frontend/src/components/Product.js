import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { getProductById } from '../actions/productActions';
import { START_LOADING, END_LOADING } from '../constants/productConstants'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const Product = ({product}) => {

  const dispatch = useDispatch();
const navigate = useNavigate();


const getProductDetails = async (id) => {

 
 
 await  getProductById(id)
  navigate(`/product/${id}}`)
  
}







  return (
    <>
    <Card className='my-3 p-3 rounded'>
    <Link to={`/product/${product._id}`}>
    <Card.Img variant="top"   src={`${product.image}`} />
    </Link>
    <Card.Body style={{ height: '14rem'}}>
    <Link to={`/product/${product.product_id}`}>
    <Card.Title as="div"  style={{ height: '5rem', marginBottom: '10px'}}> <strong>{product.name}</strong></Card.Title>
    </Link>
   
   
    <Card.Text as="div" style={{ height: '4rem',  margin: '10px 0px'  }}>
       <Rating value={product.rating} text={`${product.numReviews} reviews`} />
    </Card.Text>
  <Card.Text as="h3" style={{ height: '3rem' }}>${product.price}</Card.Text>
  </Card.Body>
</Card>
    </>
  )
}

export default Product