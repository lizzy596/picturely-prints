const express = require('express')
const router = express.Router()
const { Register, Login, updateUserDetails, getAllUsers, updateUserAdmin, deleteUser } = require('../controllers/userControllers')





router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/update').patch(updateUserDetails)
router.route('/users').get(getAllUsers).patch(updateUserAdmin)



router.route('/users/:id').delete(deleteUser)



module.exports = router