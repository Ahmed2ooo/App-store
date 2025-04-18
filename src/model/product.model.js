import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title:{
    type : String,
    required : true,
    minlength: [2,"title should unlees 2 "],
    maxlength: [30,"title should not be bigger 30"]

  },
 
  description:{
    type : String, 
    required : true,
    minlength: [30,"description should unlees 10 "],
    maxlength: [300,"description should not be bigger 500"]

  },
 
  minPrevImage:{
    type:String,
    required:true
  },
  // ratingAvg:{
  //   type:Number,
  //   default:0
  // },
  price:{
    type:Number,
    required:true
  },
  customFields: {
    type: Map, // حقل لدعم الحقول الديناميكية
    of: String, // القيم ستكون نصوص (يمكنك تغييره لدعم أنواع مختلفة)
  },
  availability: {
    type: Boolean,
    default: true,
    required: true,
   }
  
},{timestamps:true})

export const productModel= mongoose.model("Product",productSchema)