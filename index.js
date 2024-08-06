const express=require('express')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./controllers/userroutes')
const courseRouter=require('./controllers/courseroutes')
const cors=require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors({
    credentials:true,
}))
const PORT=process.env.PORT || 4000
app.use('/',userRouter)
app.use('/',courseRouter)
mongoose.connect(process.env.MPR_URL)
.then(console.log('Connection to the database is successfull'))
.catch((error)=>{console.log(error)})
app.listen(PORT,()=>{
    console.log(`Server is listeing on PORT:${PORT}`)
})