import { AddProduct, GetProductsByCategory, getAllCategories } from "../helpers/productHelper.js"

export const saveProduct = async(req,res)=>{
    const data =  await AddProduct(req.body)
    res.status(200).json(data)
}


export const getCategories = async(req,res)=>{
    const data = await getAllCategories()
    res.status(200).json(data)
}


export const categorywiseProduct =async(req,res)=>{
    const Id = req.query.categoryId
    const data = await GetProductsByCategory(Id)
    res.status(200).json(data)
}

