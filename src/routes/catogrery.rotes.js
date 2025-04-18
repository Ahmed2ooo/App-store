import { Router } from "express";
import { autharication, authrazation } from "../middleware/auth.middleware.js";
import { passUserId } from "../model/middleware/order.middleware.js";
import { addMiddleware, deleteMiddleware, getMiddleware, ubdateMiddleware } from "../middleware/query.midlleware.js";
import { Categorymodel } from "../model/category.model.js";
import { excuteMiddleware } from "../middleware/excute.middleware.js";
import { filterMiddleware } from "../middleware/feature.middleware.js";

const categoryRouter = Router({mergeParams:true})
categoryRouter.post("/",autharication,authrazation("admin"),
passUserId,addMiddleware(Categorymodel),excuteMiddleware)

categoryRouter.put("/:id",autharication,authrazation("admin"),ubdateMiddleware(Categorymodel),
filterMiddleware("_id","id"),excuteMiddleware)

categoryRouter.delete("/:id",autharication,authrazation("admin"),deleteMiddleware(Categorymodel),
filterMiddleware("_id","id"),excuteMiddleware)

categoryRouter.delete("/",autharication,authrazation("admin"),deleteMiddleware(Categorymodel),excuteMiddleware)

categoryRouter.get("/",autharication,getMiddleware(Categorymodel),
filterMiddleware("userId","id"),excuteMiddleware)

export{categoryRouter}