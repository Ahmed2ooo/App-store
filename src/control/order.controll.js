import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/orderId.model.js";
import { Errorhandler, sendError } from "../service/errorHandler.js";
//make order and delete from cart=========================================================
export const makeOrder= Errorhandler(async(req,res)=>{
    const{id}=req.params
    let orderItem=[]
    let totalprice=0
    let totalAmount=0
    const findUserCartItem=await cartModel.find({userId:id}).populate("productId")
    if(!findUserCartItem)throw new sendError(400,"Error in find user cart item ")
    findUserCartItem.map((item)=>{
    orderItem.push({
        productId:item.productId?._id,
        count:item.count

    })
    totalprice+=item.productId.price*item.count
    totalAmount+=item.count
})
req.body.orderItem=orderItem;
req.body.totalAmount=totalAmount;
req.body.totalprice=totalprice;

const result = await orderModel.create(req.body)
if(!result)throw new sendError(400,"Error in making order")
await cartModel.deleteMany({userId:id});
res.status(200).json({
    message:"sucesses",
    data:result
})
})