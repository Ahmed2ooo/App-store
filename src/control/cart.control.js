import { cartModel } from "../model/cart.model.js";
import { Errorhandler, sendError } from "../service/errorHandler.js";

export const getUserCart = Errorhandler(
    async (req, res) => {
 
    const cartItems = await cartModel.find({ userId: req.user._id })
      .populate("productId") 
      .exec();
    if(!cartItems)throw new sendError(400,"Error in get cart")
    res.status(200).json({
         message:"sucesses",
         data:cartItems
    })
  
}
)  