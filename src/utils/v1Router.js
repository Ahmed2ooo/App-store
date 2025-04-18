import { Router } from "express";
import { usersRouter } from "../routes/allusers.routes.js";
import { adminRouter } from "../routes/admin.routes.js";
import { productRouter } from "../routes/product.routes.js";
import { cartRouter } from "../routes/cart.rotes.js";
import { orderRouter } from "../routes/orderId.routes.js";



const v1Router = Router()

v1Router.use("/user",usersRouter)
v1Router.use("/admin",adminRouter)
v1Router.use("/product",productRouter)
v1Router.use("/cart",cartRouter)

export{v1Router}