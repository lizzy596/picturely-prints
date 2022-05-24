const express = require('express')
const router = express.Router()
const { addOrder, getOrderById, getUserOrders, getAllOrders, updateOrderToPaid, updateOrderToDelivered } = require('../controllers/orderControllers')
const authMiddleware = require('../middleware/Auth1')
const authAdminMiddleware = require('../middleware/adminAuth')






router.route('/').post(authMiddleware, addOrder)
router.route('/admin/:pageNumber').get(authAdminMiddleware, getAllOrders)
router.route('/pay/:id').patch(updateOrderToPaid)
router.route('/deliver/:id').patch(updateOrderToDelivered)
router.route('/:id').get(getOrderById)
router.route('/:id/user').get(getUserOrders)





module.exports = router 