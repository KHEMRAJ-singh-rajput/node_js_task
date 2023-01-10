const mongoose = require('mongoose')
mongoose.set("strictQuery",true)

mongoose.connect('mongodb://localhost:27017/user_login_api').then(()=>{
    console.log(`database connection scuess`);
}).catch((err)=>{
    console.log(err);

})