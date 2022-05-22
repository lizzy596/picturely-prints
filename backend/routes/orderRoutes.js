const express = require('express')
const router = express.Router()
const { addOrder, getOrderById, getUserOrders, getAllOrders, updateOrderToPaid } = require('../controllers/orderControllers')
const authMiddleware = require('../middleware/Auth1')
const authAdminMiddleware = require('../middleware/adminAuth')






router.route('/').post(authMiddleware, addOrder)
router.route('/admin/:pageNumber').get(authAdminMiddleware, getAllOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').patch(updateOrderToPaid)
router.route('/:id/user').get(getUserOrders)





module.exports = router 