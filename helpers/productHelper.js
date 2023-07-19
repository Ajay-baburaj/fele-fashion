import { GetCommand, PutCommand,QueryCommand,ScanCommand} from "@aws-sdk/lib-dynamodb";
import { dynamoDB, Tables } from "../model/db.config.js";
import AppError from "../utils/appError.js";
import HttpStatus from "../utils/httpStatus.js";


export const AddProduct = async (product,next) => {
    try {
        const productData = await dynamoDB.send(new ScanCommand({ TableName: Tables.PRODUCTS }))
        let id = productData.Count + 1
        product.id = id.toString()
        const command = new PutCommand({ TableName: Tables.PRODUCTS, Item: product })
        const response = await dynamoDB.send(command)

        let categoryName = "Unknown";
        if (product.categoryId === 1) {
            categoryName = "Footwear";
        } else if (product.categoryId === 2) {
            categoryName = "T-Shirts";
        } else if (product.categoryId === 3) {
            categoryName = "Jackets";
        } else if (product.categoryId === 4) {
            categoryName = "Jeans";
        }
        const categoryParams = {
            categoryId: product.categoryId.toString(),
            categoryName
        }

        const categoryCheck = await dynamoDB.send(new GetCommand({ TableName: Tables.CATEGORY, Key: { categoryId: product.categoryId.toString() } }))
        if (categoryCheck.Item == undefined) {
            const data = await dynamoDB.send(new PutCommand({TableName:Tables.CATEGORY,Item:categoryParams}))
        }
        return {message: "Product saved successfully"}
    } catch (err) {
        next(new AppError(err.message,HttpStatus.UNAUTHORIZED))
    }
}

export const getAllCategories = async(next)=>{
    try{
        const response = await dynamoDB.send(new ScanCommand({TableName:Tables.CATEGORY,ScanIndexForward: true}))
        const sortedCategories = response.Items.sort((a, b) => a.categoryId - b.categoryId);

        const data ={
            totalCategories:response.Count,
            categories:sortedCategories
        }
        return data
    }catch(err){
        next(new AppError(err.message,HttpStatus.UNAUTHORIZED))

    }
}


export const GetProductsByCategory =async(Id,next)=>{
    try{
        const filterParameter = {
            TableName: Tables.PRODUCTS,
            FilterExpression: 'categoryId = :categoryId', 
            ExpressionAttributeValues: {
              ':categoryId': parseInt(Id), 
            },
            ProjectionExpression:'id,productName,price,productImage,brand'
          };
        const categoryDetails = await dynamoDB.send(new GetCommand({TableName:Tables.CATEGORY,Key:{categoryId:Id.toString()}}))
        const products = await dynamoDB.send(new ScanCommand(filterParameter))
        const {categoryId,categoryName} = categoryDetails.Item
        const data = {
            categoryId,
            categoryName,
            products:products.Items
        }
        console.log(data)
        return data
    }catch(err){
        next(new AppError(err.message,HttpStatus.UNAUTHORIZED))

    }
}

