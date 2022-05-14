const express = require('express')
const router = express.Router()
const { addOrder, getMostRecentOrder } = require('../controllers/orderControllers')
const authMiddleware = require('../middleware/Auth1')




router.route('/').post(authMiddleware, addOrder)
router.route('/:id').get(authMiddleware, getMostRecentOrder)




module.exports = router 