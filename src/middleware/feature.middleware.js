export const filterMiddleware = (filedName,paramsName)=>{
    return(req,res,next)=>{
        req.Query  =  req.Query.where({[filedName]:req.params[paramsName]})
        next();
    }
}