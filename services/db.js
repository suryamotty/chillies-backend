const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/food')

const User= mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = {
    User
}

