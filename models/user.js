const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    age: {
        type: Schema.Types.Number,
        required: true
    },
    email: {
        type: Schema.Types.String,
        unique:true,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    tokens:[{
        token:{
            type:Schema.Types.String,
            required:true
        }
    }]
},{ timestamps: true });
userSchema.methods.genratetoken = async function ()  {
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('unable to login ')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unbale to login')
    }
    return user
}
userSchema.pre('save', async function (next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User;
