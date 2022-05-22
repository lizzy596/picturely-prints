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
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes') 
const orderRoutes = require('./routes/orderRoutes')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')






//app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors());











app.use('/auth', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.get('/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)




app.use(notFound)
app.use(errorHandlerMiddleware)


// if react router, then add this
 app.get('*', (req,res) =>{
res.sendFile(path.join(__dirname, 'build/index.html'))
 })



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})







    
    