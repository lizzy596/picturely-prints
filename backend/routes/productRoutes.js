const express = require('express')
const router = express.Router()
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProductById } = require('../controllers/productControllers')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })



/** Modulerouter.post('/updateprofilemedia/v1',
            multer({ dest: __dirname + '/../public/user_images' }),
            function(request, response, next) {
  // ...
}); */


/*router.route('/').post(upload.single('image'), addProduct)*/


/*router.route('/').post( upload.single("image"), addProduct) */


/*router.post('/', upload.any(), function(req, res, next) {
    console.log(req.body, 'Body');
    console.log(req.files, 'files');
    res.end();
  });


/*router.post('/admin', upload.single('image'), async (req, res) => {
    console.log(req.file)
})*/

/*router.post('')get('/about', (req, res) => {
  res.send('About birds')
}) */


/*router.post('/', upload.single('image'), async (req, res, next) => {
 
 const file = req.file;
 console.log(file)

  res.status(201).send('hey')




}) */


router.route('/').get(getAllProducts)
router.route('/add').post(upload.single('image'), addProduct)
router.route('/:id').get(getProductById).delete(deleteProduct).put(upload.single('image'), updateProduct)




module.exports = router 