const express = require('express')
const router = express.Router()
const { addOrder, getMostRecentOrder } = require('../controllers/orderControllers')



router.route('/').post(addOrder)
router.route('/:id').get(getMostRecentOrder)




module.exports = router 