const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
//const { CREATE_ORDER } = require




const addOrder = asyncWrapper(async(req, res, next) => {

  const { userId, cartItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice  } = req.body


let q =  "INSERT INTO orders (order_items, customer_id, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice) VALUES (?,?,?,?,?,?,?)"

 await db.query(q, [cartItems, userId, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice  ], (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(201).json({ result })
    }
  })  

 

})


const getOrderById = asyncWrapper(async(req, res, next) => {

   const { id } = req.params

   const q = `SELECT * FROM orders WHERE order_id = ${id}`

    await db.query(q, (err,result) => {
      if(err) {
        console.log(err)
      } else {
        res.status(201).json({ result })
      }
    })  

})


const getUserOrders = asyncWrapper(async(req, res, next) => {
  const { id } = req.params
  const q = `SELECT order_id, totalPrice, isPaid, isDelivered, DATE_FORMAT(created_at, '%M %d, %Y at %h:%i %p') AS created_at FROM orders WHERE customer_id = ${id} ORDER BY created_at DESC`
  await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result })
     }
   })  
})

const getAllOrders = asyncWrapper(async(req, res, next) => {
  
  const q = `SELECT order_id, customer_id, totalPrice, isPaid, isDelivered, DATE_FORMAT(created_at, '%M %d, %Y at %h:%i %p') AS created_at FROM orders ORDER BY created_at DESC`
  await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result })
     }
   })  
})














module.exports = {
    addOrder,
    getOrderById,
    getUserOrders,
    getAllOrders
    
    }