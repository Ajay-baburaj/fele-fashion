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
// app.get('/api/product/get',(req,res,next)=>{
//     try{
//         const data = getAllProducts()
//         console.log('call is coming here')
//     }catch(err){
//         console.log(err.message)
//     }  
// })

// app.post('/api/product/save',async (req,res)=>{
//     const data =  await AddProduct(req.body)
//     console.log(data)
// })

// app.get('/api/product/categories',async(req,res)=>{
//     const data = await getAllCategories()
//     res.status(200).json(data)
// })

// app.get("/api/product/list",async(req,res)=>{
//     const Id = req.query.categoryId
//     const data = await GetProductsByCategory(Id)

// })

app.all('*',(req,res,next)=>{
    next (new AppError('Not found',404))
})

app.use(errorHandlingMidlleware)

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`)
})