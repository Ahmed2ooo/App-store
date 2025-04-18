import { productModel } from "../model/product.model.js";
import { Errorhandler, sendError } from "../service/errorHandler.js";

export const addProduct = Errorhandler(async(req,res)=>{
    const addNewPrpduct = await productModel.create({...req.body})
     if(!addNewPrpduct)throw new sendError(400,"Error in added product")
            res.status(200).json({
             message:"sucesses,",
             data:addNewPrpduct
        
            })
})