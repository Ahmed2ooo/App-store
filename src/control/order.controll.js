import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/orderId.model.js";
import { Errorhandler, sendError } from "../service/errorHandler.js";
//make order and delete from cart=========================================================
// export const makeOrder = Errorhandler(async (req, res) => {
//     const { id } = req.params;
//     let orderItem = [];
//     let totalprice = 0;
//     let totalAmount = 0;

//     const findUserCartItem = await cartModel.find({ userId: id }).populate("productId");
//     if (!findUserCartItem || findUserCartItem.length === 0)
//         throw new sendError(400, "Error in find element in cart");

//     findUserCartItem.forEach((item) => {
//         const product = item.productId;
//         const count = item.count;

//         if (!product || typeof product.price !== "number" || typeof count !== "number") return;

//         orderItem.push({
//             productId: product._id,
//             count: count
//         });

//         totalprice += product.price * count;
//         totalAmount += count;
//     });

//     if (orderItem.length === 0) throw new sendError(400, "Error in find good element in cart");

//     req.body.orderItem = orderItem;
//     req.body.totalAmount = totalAmount;
//     req.body.totalprice = totalprice;
 
//     const result = await orderModel.create(req.body);
//     if (!result) throw new sendError(400, "Error in make order");

//     await cartModel.deleteMany({ userId: id });

//     res.status(200).json({
//         message: "Suceses,to make order",
//         data: result,
//     });
// });
export const makeOrder = Errorhandler(async (req, res) => {
    const { id } = req.params;
    let orderItem = [];
    let totalprice = 0;
    let totalAmount = 0;

    const findUserCartItem = await cartModel.find({ userId: id }).populate("productId");
    if (!findUserCartItem || findUserCartItem.length === 0)
        throw new sendError(400, "Error in find element in cart");

    for (const item of findUserCartItem) {
        const product = item.productId;
        const count = item.count;

        if (!product || typeof product.price !== "number" || typeof count !== "number") continue;

        if (product.quantity < count) {
            throw new sendError(400, `Insufficient quantity for the product: ${product.productName}`);
        }

        product.quantity -= count;
        product.sold += count;

        product.availability = product.quantity > 0;

        await product.save();

        orderItem.push({
            productId: product._id,
            count: count
        });

        totalprice += product.price * count;
        totalAmount += count;
    }

    if (orderItem.length === 0)
        throw new sendError(400, "Error in find good element in cart");

    req.body.orderItem = orderItem;
    req.body.totalAmount = totalAmount;
    req.body.totalprice = totalprice;
    req.body.userId = id; 

    const result = await orderModel.create(req.body);
    if (!result)
        throw new sendError(400, "Error in make order");

    await cartModel.deleteMany({ userId: id });

    res.status(200).json({
        message: "Suceses,to make order",
        data: result,
    });
});
