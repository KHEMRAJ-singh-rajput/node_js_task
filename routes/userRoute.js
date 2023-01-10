const express  = require('express')
const User = require('../models/user')
const router = express.Router()
router.post('/users/signup', async (req,res)=>{
    const data = new User(req.body)
    try {
        let user = await User.create(data)
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send({meesage:"please Enter valid details"})       
    }
})
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.genratetoken();
        res.status(201).send({user,token})
    } catch (e) {
        res.status(404).send({message:"please enter vaild email and password"})
        
    }

})
module.exports = router
