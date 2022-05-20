const express = require('express')
const router = express.Router()
const { addProduct, getAllProducts, getTopProducts, deleteProduct, updateProduct, getProductById, getReviewsById, addProductReview, getProductsBySearch } = require('../controllers/productControllers')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const authMiddleware = require('../middleware/Auth1')




router.route('/top').get(getTopProducts)
router.route('/search').get(getProductsBySearch)
router.route('/add').post(upload.single('image'), addProduct)
router.route('/:pageNumber').get(getAllProducts)
router.route('/:id').get(getProductById).delete(deleteProduct).put(upload.single('image'), updateProduct)
router.route('/reviews/:id').get(getReviewsById).post(addProductReview)





module.exports = router 