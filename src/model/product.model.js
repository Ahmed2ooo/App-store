import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName:{
    type : String,
    required : true,
    minlength: [2,"title should unlees 2 "],
    maxlength: [30,"title should not be bigger 30"]

  },
 
  description:{
    type : String, 
    required : true,
    minlength: [30,"description should unlees 10 "],
 
  },
 
  productImages:[{
    type:String,
    required:true
  }],

  ratingAvg:{
    type:Number, 
  default:0
   },
  price:{
    type:Number,
    required:true
  },
  // customFields: {
  //   type: Map, // حقل لدعم الحقول الديناميكية
  //   of: String, // القيم ستكون نصوص (يمكنك تغييره لدعم أنواع مختلفة)
  // },
  availability: {
    type: Boolean,
    default: true,
    required: true,
   },
   quantity:{
    type:Number,
    default:1,
    required: true,
   },
   color:{
    type:String
   },
   size:{
    type:String
   },
    category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    // required: [true, 'SubCategory must be belong to parent category'],
  },
  subCategory:{
    type: mongoose.Schema.ObjectId,
    ref: 'SubCategory',
    // required: [true, 'SubCategory must be belong to parent category'],
  }
  
  
},{timestamps:true})

productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.availability = false;
  } else {
    this.availability = true;
  }
  next();
});

export const productModel= mongoose.model("Product",productSchema)