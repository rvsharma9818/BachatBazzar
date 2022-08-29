import { Schema, model } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

const WishListSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        productId: { type: ObjectId,
        required: true,
        ref:'Product' },
              
        quantity: { type: Number, required: true, minLen: 1 }

    }],

    totalPrice: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
}, { timestamps: true })


export default model('WishList', WishListSchema)