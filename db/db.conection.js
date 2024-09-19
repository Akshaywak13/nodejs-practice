const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost:27017/auth')
.then(()=>{
    console.log("Connected to the Database");
})
.catch((error)=>{
    console.log("databse connection error",error);
});

module.exports = mongoose;