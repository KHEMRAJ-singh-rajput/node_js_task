const jwt = require('jsonwebtoken')

const User = require('../models/user')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(decode)
        let user = await User.findOne({_id:decode._id})
        if(user){
            req.user = user
            req.userId=user._id
        }else{
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(404).send({ error: 'please authenicate users allows' })
    }
}
module.exports = auth
