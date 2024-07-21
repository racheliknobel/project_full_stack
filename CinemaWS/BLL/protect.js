const jwt = require('jsonwebtoken');
const { User } = require('../DAL/modelUsersDB');

const protect = async(req, res, next) => {
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
     ){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

        next()
        } catch (error) {
            console.log(error)
            return error
        }
     }else return "No permissions"
    }

module.exports = { protect }