const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const { cloudinary } = require('../cloudinary')






const addProduct = asyncWrapper (async(req,res,next) => {



const file = req.file.path


const filename = req.file.filename
const { name, price, brand, category, countInStock, description } = req.body;

console.log(name, price, brand, category, countInStock, description)

let q =  "INSERT INTO products (name, image, filename, price, brand, category, countInStock, description) VALUES (?,?,?,?,?,?,?,?)"

 await db.query(q, [name, file, filename, price, brand, category, countInStock, description], (err,result) => {
   if(err) {
     console.log(err)
   } else {
     res.status(201).json({ result })
   }
 })  



}) 


const getAllProducts = asyncWrapper (async(req,res,next) => {

  
  let q =  "SELECT * FROM  products"
  
   await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
       res.status(201).json({ result })
     }
   }) 
  
  }) 


  const deleteProduct = asyncWrapper (async(req,res,next) => {

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


/*const updateProduct = asyncWrapper (async(req,res,next) => {

  const { id } = req.params;
 const { name, price, brand, category, countInStock, description } = req.body;

   if(req.file) {
    const file = req.file.path
  
    let q = `UPDATE products SET name=${name}, image=${file}, price=${price}, brand=${brand}, category=${category}, countInStock=${countInStock}, description=${description} WHERE product_id = ${id}`;

await db.query(q, (err,result) => {
if(err) {
  console.log(err)
} else {
  console.log(result)
  res.status(201).json({ result })
} 
})  
    
    
  
  
  
  
  }  else {


let q = `UPDATE products SET name=${name}, price=${price}, brand=${brand}, category=${category}, countInStock=${countInStock}, description=${description} WHERE product_id = ${id}`;

await db.query(q, (err,result) => {
if(err) {
  console.log(err)
} else {
  console.log(result)
  res.status(201).json({ result })
} 
})  
  }








}) */

const updateProduct = asyncWrapper (async(req,res,next) => {

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























module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
    
    
}