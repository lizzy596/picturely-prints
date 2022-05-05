const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mysql = require('mysql');
/*const db = require('./DB/database') */
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/productRoutes') 
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')






//app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors());











app.use('/auth', authRoutes)
app.use('/admin', productRoutes)




app.use(notFound)
app.use(errorHandlerMiddleware)


// if react router, then add this
 app.get('*', (req,res) =>{
res.sendFile(path.join(__dirname, 'build/index.html'))
 })



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})







    
    