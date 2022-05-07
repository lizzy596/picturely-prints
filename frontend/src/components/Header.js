import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'



const Header = () => {

  const { authData } = useSelector((state) => state.userReducer)

  const style ={ marginLeft: '5px', paddingRight: '3px'}
 

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
  <Container>
    <LinkContainer  to='/'>
    <Navbar.Brand>Picturely Photos</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
       <LinkContainer to='/cart'>
        <Nav.Link> <FaShoppingCart size={28} /> Cart</Nav.Link>
        </LinkContainer>

        

        {authData?.User ? <LinkContainer to='/profile'>
        <Nav.Link><FaUserCircle size={28} style={style}  /> My Profile</Nav.Link>
        </LinkContainer> :

        
        <LinkContainer to='/login'>
        <Nav.Link><FaUserCircle size={28} style={style}  />Sign In</Nav.Link>
        </LinkContainer>}
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header