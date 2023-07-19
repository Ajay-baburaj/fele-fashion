import AppError from "../utils/appError.js"
import HttpStatus from "../utils/httpStatus.js"

export const verifyApi=(req,res,next)=>{
    const apiKey = process.env.API_KEY
    if(req.headers["x-api-key"]){
        if(req.headers["x-api-key"] == apiKey){
            next()
        }else{
            next(new AppError("Invalid api key",HttpStatus.UNAUTHORIZED))
        }
    }else{
        next(new AppError("api key not found",HttpStatus.FORBIDDEN))
    }

}