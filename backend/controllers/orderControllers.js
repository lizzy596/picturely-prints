const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const { CREATE_ORDER } = require




const addOrder = asyncWrapper(async(req, res) => {

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


const getMostRecentOrder = asyncWrapper(async(req, res) => {

   

const { id } = req.params



    const q = `SELECT * FROM orders WHERE customer_id = ${id} ORDER BY created_at DESC LIMIT 1`

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
    getMostRecentOrder
    
    }