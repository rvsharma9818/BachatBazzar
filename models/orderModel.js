const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String
      },
      quantity: {
        type: Number,
        default: 1
      }
    },
  ],
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shipping: {
    type: Object,
    required: true
  },
  delivery_status: {
    type: String,
    default: "pending"
  },
  payment_status: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},
  { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)