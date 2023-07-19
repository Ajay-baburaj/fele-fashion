import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/productRoutes.js'
import AppError from './utils/appError.js'
import errorHandlingMidlleware from './middlewares/errorHandling.js'
const app = express()
dotenv.config() 


app.use(cors({origin:'*',credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/product',router)

app.all('*',(req,res,next)=>{
    next (new AppError('Not found',404))
})

app.use(errorHandlingMidlleware)

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`)
})