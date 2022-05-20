import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllUsers} from '../actions/userActions'
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai"
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import { adminUserDelete } from '../actions/userActions'
import { ADMIN_EDIT_USER, START_LOADING, END_SUCCESS, SET_DELETE_SUCCESS } from '../constants/userConstants'
import Paginate from '../components/Paginate'


const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { error, isLoading, error_message, users, success, success_message }  = useSelector((state) => state.userReducer);


 



 

  /*useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo]) */



  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {

    
      dispatch(getAllUsers())
    
    
  }, [success]) 

  //const [ users, setUsers] = useState([])

 
 


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(adminUserDelete(id))
      dispatch({ type: SET_DELETE_SUCCESS })
    }
  }

  const editHandler = (id) => {
    dispatch({type: START_LOADING})
  
    dispatch({type: ADMIN_EDIT_USER, payload: id})
    navigate('/admin/users/edit')
  
  }


  useEffect(() => {

    
    const timer = setTimeout(() => {
      dispatch({type: END_SUCCESS})
    }, 2000);
    return () => clearTimeout(timer);
  }, [success]);

  




const style = { color: "green", fontSize: "1.5em" }
const style1 = { color: "red", fontSize: "1.5em" }


if (isLoading) {
 
  return (
   <Loader />
  );
}







  return (
    <>
      <h1>Users</h1>
   
        {success && <Message variant='success'>{success_message}</Message>}
        {error && <Message variant='danger'>{error_message}</Message>}
     
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }}/>
                  ) : (
                    <FaTimes  style={{ color: 'red' }}></FaTimes>
                  )}
                </td>
                <td>
                  
                  
                    <FaRegEdit style={style} onClick={() => editHandler(user.user_id)}/>
                   
                  
                </td>
                <td>
               
                   <AiFillDelete style={style1} onClick={() => deleteHandler(user.user_id)}  />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

   
      
    </>
  )
}

export default UserListScreen
