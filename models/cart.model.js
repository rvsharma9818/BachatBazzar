const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    
      productimage:{
        type:String,
        required:true
      }
    ,
    quantity: {
      type: Number,
      default:1,
    },
    productSize: {
      type: String,
      required: true,
    },
  },
    
);

module.exports = mongoose.model("Cart", CartSchema);
