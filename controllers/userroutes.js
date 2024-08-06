const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router()
const userModel=require('../models/users')
const courseModel=require('../models/courses')
router.post('/register',async(req,res)=>{
    try{

        const {username,password}=req.body
        const hashPassword=await bcrypt.hash(password,10)
        const user=await userModel.create({username,password:hashPassword})
        res.status(200).json(user)
    }catch(error){
        res.status(404).json({error})
    }
})
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist! Register yourself.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json();
        }

        const token = jwt.sign({ userID: user._id }, 'secret');
        return res.status(200).json({ token, userID: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router;