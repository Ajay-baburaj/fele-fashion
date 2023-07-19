import express from 'express'
import { categorywiseProduct, getCategories, saveProduct } from '../controllers/productController.js'
import { verifyApi } from '../middlewares/verify.js'
const router = express.Router()

router.post('/save',verifyApi,saveProduct)
router.get('/categories',verifyApi,getCategories)
router.get('/list',verifyApi,categorywiseProduct)


export default router