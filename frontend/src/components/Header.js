import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOG_OUT } from '../constants/userConstants'
import SearchBox from '../components/SearchBox'



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authData }  = useSelector((state) => state.userReducer);
  const user = JSON.parse(localStorage.getItem('profile'));

  const style ={ marginLeft: '5px', paddingRight: '3px'}


  const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));

  const [ show, setShow] = useState(false)







 






  const logOut = () => {
    dispatch({type: LOG_OUT})
    navigate('/')
  }

 
 

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3"  >
  <Container  >
   
    <LinkContainer  to='/'>
    <Navbar.Brand className="">Picturely Photos</Navbar.Brand>
    </LinkContainer>
  
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
   
    {show && <SearchBox className="search-bar" />}

     
    
      <Nav className="ms-auto">
      {user?.isAdmin === 0 && <LinkContainer to='/cart'>
        <Nav.Link> <FaShoppingCart size={28} /> Cart</Nav.Link>
        </LinkContainer>}

        

        {!user &&
          <LinkContainer to='/login'>
          <Nav.Link><FaUserCircle size={28} style={style}  />Sign In</Nav.Link>
          </LinkContainer>}


       {user?.isAdmin === 0 && <LinkContainer to='/profile'>
        <Nav.Link><FaUserCircle size={28} style={style}  /> My Profile</Nav.Link>
        </LinkContainer>}

{user?.isAdmin === 1 &&
  <NavDropdown title='Admin' id='adminmenu'>
    <LinkContainer to='/admin/users'>
      <NavDropdown.Item>Users</NavDropdown.Item>
    </LinkContainer>
    <LinkContainer to='/admin/products'>
      <NavDropdown.Item>Products</NavDropdown.Item>
    </LinkContainer>
    <LinkContainer to='/admin/orders'>
      <NavDropdown.Item>Orders</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
  </NavDropdown>
}



        
         

        
       
      </Nav>
      
      
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header