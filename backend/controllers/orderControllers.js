const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const uniqid = require('uniqid'); 

//const { CREATE_ORDER } = require




const addOrder = asyncWrapper(async(req, res, next) => {

  const order_id = uniqid() 
  const { userId, cartItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice  } = req.body


let q =  "INSERT INTO orders (order_id, order_items, customer_id, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice) VALUES (?,?,?,?,?,?,?,?)"

 await db.query(q, [order_id, cartItems, userId, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice  ], (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(201).json({ result })
    }
  })  

 

})


const getOrderById = asyncWrapper(async(req, res, next) => {

   const { id } = req.params

   const q = `SELECT order_id, order_items, customer_id, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice, isPaid, DATE_FORMAT(paidAt, '%M %d, %Y at %h:%i %p') AS paidAt, isDelivered, DATE_FORMAT(deliveredAt, '%M %d, %Y at %h:%i %p') AS deliveredAt FROM orders WHERE order_id = ?`

    await db.query(q, [id], (err,result) => {
      if(err) {
        console.log(err)
      } else {
        res.status(201).json({ result })
      }
    })  

})


const getUserOrders = asyncWrapper(async(req, res, next) => {
  const { id } = req.params
  const q = `SELECT order_id, totalPrice, isPaid, DATE_FORMAT(paidAt, '%M %d, %Y at %h:%i %p') AS paidAt, isDelivered, DATE_FORMAT(deliveredAt, '%M %d, %Y at %h:%i %p') AS deliveredAt, DATE_FORMAT(created_at, '%M %d, %Y at %h:%i %p') AS created_at FROM orders WHERE customer_id = ${id} ORDER BY created_at DESC`
  await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result })
     }
   })  
})

const getAllOrders = asyncWrapper(async(req, res, next) => {
  if(req.user.isAdmin === 0) {
    return next(createCustomError('Unauthorized Route', 401))
}
  
const { pageNumber } = req.params

const pageSize=4
const page = Number(pageNumber) || 1
let offsetValue = (page-1) * pageSize;
  
  const q = `SELECT count(*) OVER() AS full_count, order_id, customer_id, totalPrice, isPaid, isDelivered, DATE_FORMAT(created_at, '%M %d, %Y at %h:%i %p') AS created_at FROM orders ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offsetValue}`
  await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result, page, pageSize })
     }
   })  
})



const updateOrderToPaid = asyncWrapper (async(req,res,next) => {


const { id } = req.params;

let paymentResult = {
  id: req.body.id,
  status: req.body.status,
  update_time: req.body.update_time,
  email_address: req.body.payer.email_address,
} 

let updated = JSON.stringify(paymentResult)



//let q = `UPDATE orders SET isPaid=1, paidAt=NOW(), payId=${paymentResult.id}, payStatus=${paymentResult.status} WHERE order_id = ${id}`;
let q = 'UPDATE orders SET isPaid=1, paidAt=NOW(), paymentResult=? WHERE order_id = ?';

await db.query(q, [updated, id], (err,result) => {
if(err) {
  console.log(err)
} else {
  
  res.status(201).json({ result })
} 
})  

}) 



const updateOrderToDelivered = asyncWrapper (async(req,res,next) => {


  const { id } = req.params;
  
  
  
  //let q = `UPDATE orders SET isPaid=1, paidAt=NOW(), payId=${paymentResult.id}, payStatus=${paymentResult.status} WHERE order_id = ${id}`;
  let q = `UPDATE orders SET isDelivered=1, deliveredAt=NOW() WHERE order_id = ${id}`;
  
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
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered
    
    }