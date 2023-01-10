require('dotenv').config()
const express = require('express');
const app = express()
require('./db/mongoose')
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute');

app.use(express.json())
app.use(userRouter)
app.use(postRouter)



app.listen(2000,()=>{
    console.log(`the port is running`);
})
