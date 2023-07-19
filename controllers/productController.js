import { AddProduct, GetProductsByCategory, getAllCategories } from "../helpers/productHelper.js"

export const saveProduct = async(req,res,next)=>{
    const data =  await AddProduct(req.body,next)
    res.status(200).json(data)
}


export const getCategories = async(req,res,next)=>{
    const data = await getAllCategories(next)
    res.status(200).json(data)
}


export const categorywiseProduct =async(req,res,next)=>{
    const Id = req.query.categoryId
    const data = await GetProductsByCategory(Id,next)
    res.status(200).json(data)
}

