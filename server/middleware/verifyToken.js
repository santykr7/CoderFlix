const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  const bearerToken = req.header('Authorization')
  const token = bearerToken.split(' ')[1]

  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' })

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if(error){
        return res 
        .status(401)
        .json({ success: false, message: 'Access Denied'})
      }

      req.id = decoded.id
      next();
    })
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Access Denied' })
  }
}
module.exports = verifyToken