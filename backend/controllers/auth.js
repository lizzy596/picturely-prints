const db = require("../DB/database");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const { createToken, validateToken } = require('../JWT')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



const Register = asyncWrapper (async (req, res, next) => {
 
 const { first_name, last_name, password, confirmPassword, email  } = req.body;

 if(!first_name|| !last_name || !email || !password || !confirmPassword  ) {
    //return res.status(404).json({ message: "Provide Username and Password" });
 return next(createCustomError('Complete All Fields', 401))
}

if(password.length < 6 ) {
    //return res.status(404).json({ message: "Provide Username and Password" });
return next(createCustomError('Password must be 6 or more characters', 401))
}

if(password !== confirmPassword) {
    //return res.status(404).json({ message: "Provide Username and Password" });
return next(createCustomError('Passwords do not match!', 401))
}


let hash = bcrypt.hashSync(password, salt);
 await db.query("INSERT INTO user (first_name, last_name, password, email) VALUES (?,?,?,?)", 
 [first_name, last_name, hash, email], 
 (err, result) => {
     if(err) {
        return next(createCustomError('User already exists!', 401))
     } else {

        const token = createToken(first_name);
        res.status(200).json({ User : {email, name: first_name }, token })
         
     }
 }
 )

})






const Login = asyncWrapper (async(req,res,next) => {

    const { email, password } = req.body;
    if(!email || !password ) {
        //return res.status(404).json({ message: "Provide Username and Password" });
     return next(createCustomError('Enter email and password!', 401))
    }

    

    let q = 'SELECT * FROM user WHERE email = ?'
    db.query(q, [email], (err, result) => {
        if(err) {
            res.send({err:err})
        } 
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {

                    const token = createToken(result[0].first_name);
                    res.status(200).json({ User : {email: result[0].email, name: result[0].first_name, isAdmin: result[0].isAdmin}, token })
                    
                
                 
                } else {
                    return next(createCustomError('Invalid Credentials', 401))
                }
            })
        } else {
            return next(createCustomError('User does not exist', 401))
        }
    })
}) 














module.exports = {
    Register,
    Login
    
    
}