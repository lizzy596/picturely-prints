const express = require('express')
const router = express.Router()
const { addProduct, getAllProducts, getTopProducts, deleteProduct, updateProduct, getProductById, getReviewsById, addProductReview, getProductsBySearch, validateIsAdmin } = require('../controllers/productControllers')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const authMiddleware = require('../middleware/Auth1')
const authAdminMiddleware = require('../middleware/adminAuth')




router.route('/top').get(getTopProducts)
router.route('/search').get(getProductsBySearch)
router.route('/add').get(authAdminMiddleware, validateIsAdmin).post(authAdminMiddleware, upload.single('image'), addProduct)
router.route('/:pageNumber').get(getAllProducts)
router.route('/product/:id').get(getProductById).delete(authAdminMiddleware, deleteProduct).put(authAdminMiddleware, upload.single('image'), updateProduct)
router.route('/reviews/:id').get(getReviewsById).post(addProductReview)





module.exports = router 