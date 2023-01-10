const express = require('express');
const Post = require('../models/post')
const auth = require('../middleware/auth')
const router = express.Router();


// create post 
router.post('/posts',auth,async(req,res)=>{
    const post = new Post(req.body)
    try {
        await post.save()
        res.status(200).send(post)
    } catch (error) {
        res.status(404).send(error)
    }
})
// get all post data 
router.get('/post-data',auth,async(req,res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).send(posts)
    } catch (error) {
        res.status(404).send(error)  
    }
})

// get data with sigal post with id 
router.get('/post-data/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try {
        const post = await Post.findById(_id)
        if(!post){
           return  res.status(404).send({msg:"invaild post"})
        }
        res.status(200).send(post)
    } catch (error) {
        res.status(404).send(error)    
    }
})

// update data with id 
router.patch('/posts/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdatePost = ['title','body','cretedby','isActive']
    const isvalidation = updates.every((update)=> allowUpdatePost.includes(update) )
    if(!isvalidation){
       return res.status(404).send({message:"post not found"})
    }
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body ,{new:true , runValidators:true})
        if(!post){
            return res.status(404).send({message:"invaild post"})
        }
        res.status(200).send(post)
    } catch (e) {
        res.status(404).send({message:"invaid post"})    
    }
})


// delete post with id 
router.delete('/posts/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.status(404).send()
        }
        res.send(post)
    } catch (e) {
        res.status(404).send(e)   
    }
})
module.exports = router ;
