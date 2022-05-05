app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employees SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });


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


}) 
