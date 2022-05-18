import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { adminUserEdit } from '../actions/userActions'
import { END_LOADING, END_ERROR } from '../constants/userConstants'
import { useNavigate } from 'react-router-dom'

const UserEditScreen = () => {
  //const userId = match.params.id

  const navigate = useNavigate()




  const [userId, setUserId] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { error, isLoading, error_message, editingUser, userToEdit  }  = useSelector((state) => state.userReducer);

 
  useEffect(() => {
    if(editingUser && userToEdit) {
      setUserId(userToEdit.user_id)
      setFirstName(userToEdit.first_name)
      setLastName(userToEdit.last_name)
      setEmail(userToEdit.email)
      setIsAdmin(userToEdit.isAdmin === 1 ? true : false)
     dispatch({type: END_LOADING})
  
    }
  }, [])
 
 
 
 
 
 
 
 
 
 
 
  /*const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate]) */

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({type: END_ERROR})
    dispatch(adminUserEdit({ userId, firstName, lastName, email, isAdmin }))
    dispatch({type: END_LOADING})
    navigate('/admin/users')

  }





     
  if (isLoading) {
 
    return (
     <Loader />
    );
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        
        {error && <Message variant='danger'>{error_message}</Message>}
       
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='fname'>
              <Form.Label className="py-2">First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='lname'>
              <Form.Label className="py-2">last Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className="py-2">Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className="py-3">
          
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            

            <Button type='submit' variant='primary' className="py-3">
              Update
            </Button>
          </Form>
        
      </FormContainer>
    </>
  )
}

export default UserEditScreen