const express = require('express')
const router = express.Router()
const { addProduct, getAllProducts, getTopProducts, deleteProduct, updateProduct, getProductById, getReviewsById, addProductReview } = require('../controllers/productControllers')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const authMiddleware = require('../middleware/Auth1')





router.route('/').get(getAllProducts)
router.route('/add').post(upload.single('image'), addProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).delete(deleteProduct).put(upload.single('image'), updateProduct)
router.route('/reviews/:id').get(getReviewsById).post(addProductReview)




module.exports = router 