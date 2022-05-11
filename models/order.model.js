const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
  quantity: {
    type: Number,
    default: 1,
  },
  amount: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports=mongoose.model('Order',orderSchema)