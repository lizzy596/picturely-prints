const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const { cloudinary } = require('../cloudinary')






const addProduct = asyncWrapper (async(req,res,next) => {

  if(req.user.isAdmin === 0) {
    return next(createCustomError('Unauthorized Route', 401))
}



const file = req.file.path


const filename = req.file.filename
const { name, price, brand, category, countInStock, description } = req.body;

if(!name|| !file || !price|| !brand || !category || !countInStock || !description  ) {
  //return res.status(404).json({ message: "Provide Username and Password" });
return next(createCustomError('Complete All Fields', 400))
}



let q =  "INSERT INTO products (name, image, filename, price, brand, category, countInStock, description) VALUES (?,?,?,?,?,?,?,?)"

 await db.query(q, [name, file, filename, price, brand, category, countInStock, description], (err,result) => {
   if(err) {
    return next(createCustomError('something went error', 500))
   } else {
     res.status(201).json({ result })
   }
 })  



}) 


/*const getAllProducts = asyncWrapper (async(req,res,next) => {



const q = `SELECT products.product_id, products.product_id, products.name, products.price, products.image, products.brand, products.category, products.countInStock, products.description, ROUND (IFNULL(avg(reviews.rating), 0),2) AS averageRating, COUNT(reviews.product_id) AS numOfReviews  
FROM products 
LEFT OUTER JOIN reviews 
ON products.product_id=reviews.product_id
GROUP BY products.product_id`
  
   await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result })
     }
   }) 
  
  }) */


  
const getAllProducts = asyncWrapper (async(req,res,next) => {

const { pageNumber } = req.params



  const pageSize=2
  const page = Number(pageNumber) || 1
  let offsetValue = (page-1) * pageSize;
  
  const q = `SELECT count(*) OVER() AS full_count, products.product_id, products.name, products.price, products.image, products.brand, products.category, products.countInStock, products.description, ROUND (IFNULL(avg(reviews.rating), 0),2) AS averageRating, COUNT(reviews.product_id) AS numOfReviews  
  FROM products 
  LEFT OUTER JOIN reviews 
  ON products.product_id=reviews.product_id
 
 
  GROUP BY products.product_id

  LIMIT ${pageSize} OFFSET ${offsetValue}`
    
     await db.query(q, (err,result) => {
       if(err) {
         console.log(err)
       } else {
         res.status(201).json({ result, page, pageSize })
       }
     }) 
    
    }) 



  











  const getTopProducts = asyncWrapper (async(req,res,next) => {

  

 const q = `SELECT products.product_id, products.product_id, products.name, products.price, products.image, products.brand, products.category, products.countInStock, products.description, ROUND (IFNULL(avg(reviews.rating), 0),2) AS averageRating, COUNT(reviews.product_id) AS numOfReviews  
 FROM products 
 LEFT OUTER JOIN reviews 
 ON products.product_id=reviews.product_id
 GROUP BY products.product_id
 ORDER BY averageRating DESC LIMIT 3`
   
    await db.query(q, (err,result) => {
      if(err) {
        console.log(err)
      } else {
        res.status(201).json({ result })
      }
    }) 
   
   }) 



const getProductsBySearch = asyncWrapper (async(req,res,next) => {

const { searchQuery, pageNumber } = req.query;

let searchTerm = `${searchQuery}%`


const pageSize=2
const page = Number(pageNumber) || 1
let offsetValue = (page-1) * pageSize;

const q = `SELECT count(*) OVER() AS full_count, products.product_id, products.product_id, products.name, products.price, products.image, products.brand, products.category, products.countInStock, products.description, ROUND (IFNULL(avg(reviews.rating), 0),2) AS averageRating, COUNT(reviews.product_id) AS numOfReviews  
FROM products  
LEFT OUTER JOIN reviews 
ON products.product_id=reviews.product_id
WHERE LOWER(products.name) LIKE '${searchTerm}'
GROUP BY products.product_id
LIMIT ${pageSize} OFFSET ${offsetValue}`

    //const q = `SELECT product_id FROM products WHERE LOWER(products.name) LIKE '${searchTerm}'`
await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result, page, pageSize })
     } 

   }) 

}) 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
const deleteProduct = asyncWrapper (async(req,res,next) => {

  if(req.user.isAdmin === 0) {
    return next(createCustomError('Unauthorized Route', 401))
}
const { id } = req.params;
let q =  `DELETE FROM products WHERE product_id = ${id}`
 await db.query(q, (err,result) => {
  if(err) {
    console.log(err)
  } else {

    console.log(result)
    res.status(201).json({ result })
  }
}) 
}) 


const updateProduct = asyncWrapper (async(req,res,next) => {


  if(req.user.isAdmin === 0) {
    return next(createCustomError('Unauthorized Route', 401))
}

  const { id } = req.params;
 const { name, price, brand, category, countInStock, description } = req.body;

   if(req.file) {
    const file = req.file.path
  
    let q = 'UPDATE products SET name=?, image=?, price=?, brand=?, category=?, countInStock=?, description=? WHERE product_id = ?';

await db.query(q,  [name, file, price, brand, category, countInStock, description, id], (err,result) => {
if(err) {
  console.log(err)
} else {
  console.log(result)
  res.status(201).json({ result })
} 
})  
}  else {


    let q = 'UPDATE products SET name=?, price=?, brand=?, category=?, countInStock=?, description=? WHERE product_id = ?';

    await db.query(q,  [name, price, brand, category, countInStock, description, id], (err,result) => {
    if(err) {
      console.log(err)
    } else {
      console.log(result)
      res.status(201).json({ result })
    } 
    })  
  }


}) 


/*const getProductById = asyncWrapper(async(req,res,next) => {
  
  const { id } = req.params;
  const q = `SELECT * FROM products WHERE product_id = ${id}`
  
  await db.query(q, (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(201).json({ result })
    }
  }) 

}) */


const getProductById = asyncWrapper (async(req,res,next) => {

  const { id } = req.params
  
  
    const q = `SELECT count(*) OVER() AS full_count, products.product_id, products.name, products.price, products.image, products.brand, products.category, products.countInStock, products.description, ROUND (IFNULL(avg(reviews.rating), 0),2) AS averageRating, COUNT(reviews.product_id) AS numOfReviews  
    FROM products 
    LEFT OUTER JOIN reviews 
    ON products.product_id=reviews.product_id
    WHERE products.product_id = ${id}`
      
       await db.query(q, (err,result) => {
         if(err) {
           console.log(err)
         } else {
           res.status(201).json({ result  })
         }
       }) 
      
      }) 




const getReviewsById = asyncWrapper(async(req, res, next) => {
  const { id } = req.params;

  const q = `SELECT user_name, rating, product_id, comment, DATE_FORMAT(created_at, '%M %d, %Y') AS created_at FROM reviews WHERE product_id = ${id} ORDER BY created_at DESC`

  await db.query(q, (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(201).json({ result })
    }
  }) 
})

const addProductReview = asyncWrapper(async(req, res, next) => {

 
const { user_name, rating, comment, user_id, product_id } = req.body

if(!rating || !comment) {
  
  return next(createCustomError('Must complete all fields', 401))
}

  let q =  "INSERT INTO reviews (user_name, rating, comment, user_id, product_id) VALUES (?,?,?,?,?)"

  await db.query(q, [user_name, rating, comment, user_id, product_id], (err,result) => {
    if(err) {
      return next(createCustomError('You have already reviewed this item!', 401))
    } else {
      res.status(201).json({ result })
    }
  })  

})





































module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getReviewsById,
  addProductReview,
  getTopProducts,
  getProductsBySearch
  
    
    
}