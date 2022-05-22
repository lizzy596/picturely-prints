const express = require('express')
const router = express.Router()
const { Register, Login, updateUserDetails, getAllUsers, updateUserAdmin, deleteUser } = require('../controllers/userControllers')
const authAdminMiddleware = require('../middleware/adminAuth')





router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/update').patch(updateUserDetails)
router.route('/users').patch(authAdminMiddleware, updateUserAdmin)
router.route('/users/all/:pageNumber').get(authAdminMiddleware, getAllUsers)



router.route('/users/:id').delete(deleteUser)



module.exports = router