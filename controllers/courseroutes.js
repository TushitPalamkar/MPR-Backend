const express=require('express')
const courseModel=require('../models/courses')
const userModel=require('../models/users')
const router=express.Router()
router.get('/getcourses',async(req,res)=>{
    try{

        const course=await courseModel.find()
        res.status(200).json(course)
    }catch(error)
    {
        res.json(error)
    }
})
router.post('/newcourse',async(req,res)=>{
    try{
        const {title,description,instructor,courseimg}=req.body
        const course=await courseModel.create({title,description,instructor,courseimg})
        res.status(200).json(course)
    }
    catch(error)
    {
        res.json(error)
    }
})
router.put('/savecourses',async(req,res)=>{
    try{

        const userID=req.body.userID
        const courseID=req.body.courseID
        const user=await userModel.findById(userID)
        const course=await courseModel.findById(courseID)
        user.usercourses.push(course)
        await user.save()
        res.json(user)
    }catch(error){
        res.json(error)
    }

})
router.get('/getonecourse/:id',async(req,res)=>{
    try{
        const course=await courseModel.findById(req.params.id)
        res.json(course)
    }catch(error){
        console.log(error)
    }
})
router.get('/getsavedcourses/:id',async(req,res)=>{
    try{

        const userID=req.params.id;
        const user=await userModel.findById(userID)
        const course=await courseModel.findById(user.usercourses)
        res.json(course)
    }
    catch(error){
        res.json(error)
    }

})
module.exports=router