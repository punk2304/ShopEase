
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
name:{
  type:String,
  required: [true,'Please enter product name'],
  trim:true,
  maxLength:[100,'Product name cannot exceed 100 characters']
   
},

price:{
  type: Number,
  required:[true,'Please enter your price'],
  maxLength:[5,'Product name exceed 5 characters'],
  default:0.0

},

description:{
type:String,
required:[true,'Please enter description']
},
images:[{
public_id:{
  type:String,
  required:true
},

url:{
  type:String,
  required:true
}

}
],
category:{
  type:String,
  required:[true,'Please select category for this product'],
  enem:{
    values:[
      'Electronics',
      'Cameras',

    'Latops','Headphones','Food','Home','Outdoor','Clothes/shoes','Beauty/Health','Books'
  ],message:'Please se;ect correct product category'
  }
   
},
seller:{
  type:String,
  required:[true,'please Enter product seller']

},
stock:{
  type:Number,
  required:[true,'Please enter product stocks'],
  maxLength:[5,'Product name can not exceed 5 characters'],
  default:0

},
numberOfReviews:{
    type:Number,
    default:0,
},
reviews:[],

createdAt:{
type:Date,
defualt: Date.now
},

user:{
  type:mongoose.Schema.ObjectId,
  ref:'user',
  required:true
}

});

module.exports = mongoose.model("product", productSchema);


