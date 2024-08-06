const mongoose=require('mongoose')
const courseModel=new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    instructor:{
        type:String
    },
    courseimg:{
        type:String
    }
},
{
    timestamps:true
},)
module.exports=mongoose.model('courses',courseModel)