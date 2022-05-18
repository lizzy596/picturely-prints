const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const { createToken, validateToken } = require('../JWT')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')



const Register = asyncWrapper (async (req, res, next) => {
 
 const { first_name, last_name, password, confirmPassword, email  } = req.body;

 if(!first_name|| !last_name || !email || !password || !confirmPassword  ) {
    //return res.status(404).json({ message: "Provide Username and Password" });
 return next(createCustomError('Complete All Fields', 400))
}

if(password.length < 6 ) {
    //return res.status(404).json({ message: "Provide Username and Password" });
return next(createCustomError('Password must be 6 or more characters', 400))
}

if(password !== confirmPassword) {
    //return res.status(404).json({ message: "Provide Username and Password" });
return next(createCustomError('Passwords do not match!', 400))
}


let hash = bcrypt.hashSync(password, salt);
 await db.query("INSERT INTO user (first_name, last_name, password, email) VALUES (?,?,?,?)", 
 [first_name, last_name, hash, email], 
 (err, result) => {
     if(err) {
        return next(createCustomError('User already exists!', 401))
     } else {

        //const token = createToken(first_name);
        //res.status(200).json({ User : {email, name: first_name, user_id }, token })

        const token = jwt.sign({ email, first_name, last_name  }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          })

          res.status(200).json({ email, first_name, last_name, isAdmin:0, token })
         
     }
 }
 )

})






/*const Login = asyncWrapper (async(req,res,next) => {

    const { email, password } = req.body;
    if(!email || !password ) {
        //return res.status(404).json({ message: "Provide Username and Password" });
     return next(createCustomError('Enter email and password!', 400))
    }

    let q = 'SELECT * FROM user WHERE email = ?'
    db.query(q, [email], (err, result) => {
        if(err) {
            res.send({err:err})
        } 
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {

                    //const token = createToken(result[0].first_name);
                   // res.status(200).json({ User : {user_id: result[0].user_id, email: result[0].email, name: result[0].first_name, isAdmin: result[0].isAdmin}, token })
                   const token = jwt.sign({ email: result[0].email,  user_id: result[0].user_id, first_name: result[0].first_name, last_name: result[0].last_name, isAdmin: result[0].isAdmin},  process.env.JWT_SECRET, {
                    expiresIn: '30d',
                  })

                   res.status(200).json({ email: result[0].email,  user_id: result[0].user_id, first_name: result[0].first_name, last_name: result[0].last_name, isAdmin: result[0].isAdmin, token });
                
                 
                } else {
                    return next(createCustomError('Invalid Credentials', 401))
                }
            })


4           } else {
            return next(createCustomError('User does not exist', 400))
        }
    })
})  */


const Login = asyncWrapper (async(req,res,next) => {

    const { email, password } = req.body;
    if(!email || !password ) {
        //return res.status(404).json({ message: "Provide Username and Password" });
     return next(createCustomError('Enter email and password!', 400))
    }

    let q = 'SELECT * FROM user WHERE email = ?'
    db.query(q, [email], (err, result) => {
        if(err) {
            return next(createCustomError('Invalid Credentials', 401))
        } 
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {

                    //const token = createToken(result[0].first_name);
                   // res.status(200).json({ User : {user_id: result[0].user_id, email: result[0].email, name: result[0].first_name, isAdmin: result[0].isAdmin}, token })
                   const token = jwt.sign({ email: result[0].email,  user_id: result[0].user_id, first_name: result[0].first_name, last_name: result[0].last_name, isAdmin: result[0].isAdmin},  process.env.JWT_SECRET, {
                    expiresIn: '30d',
                  })

                   res.status(200).json({ email: result[0].email,  user_id: result[0].user_id, first_name: result[0].first_name, last_name: result[0].last_name, isAdmin: result[0].isAdmin, token });
                
                 
                } else {
                    return next(createCustomError('Invalid Credentials', 401))
                }
            })


4           } else {
            return next(createCustomError('User does not exist', 400))
        }
    })
}) 










const updateUserDetails = asyncWrapper(async(req, res, next) => {
    const { id, firstName, lastName, password, confirmPassword, email  } = req.body;

    

    if(!firstName|| !lastName || !email || !password || !confirmPassword  ) {
        //return res.status(404).json({ message: "Provide Username and Password" });
     return next(createCustomError('Complete All Fields', 400))
    }
    
    if(password.length < 6 ) {
        //return res.status(404).json({ message: "Provide Username and Password" });
    return next(createCustomError('Password must be 6 or more characters', 400))
    }
    
    if(password !== confirmPassword) {
        //return res.status(404).json({ message: "Provide Username and Password" });
    return next(createCustomError('Passwords do not match!', 400))
    }

    let hash = bcrypt.hashSync(password, salt); 

    let q = 'UPDATE user SET first_name=?, last_name=?, password=?, email=? WHERE user_id = ?';

    await db.query(q,  [firstName, lastName, hash, email, id], (err,result) => {
        if(err) {
           return next(createCustomError('Something went wrong', 500))
        } else {

            const token = jwt.sign({ email, user_id: id, first_name: firstName, last_name: lastName, isAdmin: 0},  process.env.JWT_SECRET, {
                expiresIn: '30d',
              })
          
          res.status(201).json({ email, user_id: id, first_name: firstName, last_name: lastName, isAdmin: 0,  token })
        } 
        }) 


})




const getAllUsers = asyncWrapper(async(req, res, next) => {
   let q = 'SELECT * FROM user';
    await db.query(q, (err,result) => {
        if(err) {
           return next(createCustomError('Something went wrong', 500))
        } else {
        res.status(201).json({ result })
        } 
        }) 

})


/*const updateUserAdmin = asyncWrapper(async(req, res, next) => {

    const { id, firstName, lastName, email, isAdmin  } = req.body;
        if(!firstName|| !lastName || !email || !isAdmin ) {
       
     return next(createCustomError('Complete All Fields', 400))
    }
    
    let q = 'UPDATE user SET first_name=?, last_name=?, email=?, isAdmin=? WHERE user_id = ?';

    await db.query(q,  [firstName, lastName, email, isAdmin, id], (err,result) => {
        if(err) {
           return next(createCustomError('Something went wrong', 500))
        } else {
         res.status(201).json({ result })
        } 
        }) 
}) */


const updateUserAdmin= asyncWrapper(async(req, res, next) => {

    const { userId, firstName, lastName, email, isAdmin  } = req.body;

    let setAdmin;
     
    if(isAdmin) {
        setAdmin=1
    } else {
        setAdmin=0
    }
    

    let q = 'UPDATE user SET first_name=?, last_name=?, email=?, isAdmin=? WHERE user_id = ?';

    await db.query(q,  [firstName, lastName, email, setAdmin, userId], (err,result) => {
        if(err) {
           return next(createCustomError('Something went wrong', 500))
        } else {
        res.status(201).json({ result })
        } 
        }) 
 })


 const deleteUser = asyncWrapper (async(req,res,next) => {
    const { id } = req.params;
    let q =  `DELETE FROM user WHERE user_id = ${id}`
    await db.query(q, (err,result) => {
     if(err) {
       console.log(err)
     } else {
   
       console.log(result)
       res.status(201).json({ result })
     }
   }) 
 }) 
















module.exports = {
    Register,
    Login,
    updateUserDetails,
    getAllUsers,
    updateUserAdmin,
    deleteUser
    
    
}