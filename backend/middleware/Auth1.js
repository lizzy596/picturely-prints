const jwt = require('jsonwebtoken')
//const { UnauthenticatedError } = require('../errors/unauthenticated')
const {createCustomError} = require('../errors/custom-error')




const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization



  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new createCustomError('No token provided', 400)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { user_id, email } = decoded
    req.user = { user_id, email }

   next()
  } catch (error) {
    throw new createCustomError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware