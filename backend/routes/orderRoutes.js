const express = require('express')
const router = express.Router()
const { addOrder, getOrderById, getUserOrders, getAllOrders } = require('../controllers/orderControllers')
const authMiddleware = require('../middleware/Auth1')




router.route('/').post(authMiddleware, addOrder)
router.route('/admin').get(getAllOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/user').get(getUserOrders)





module.exports = router 