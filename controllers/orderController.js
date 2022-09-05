const userModel = require("../models/usermodel");

const CartModel = require("../models/cartModel");

const orderModel = require("../models/orderModel");


// User feature to place order


// Admin feature to see aorder list

const getorder = (async (req, res) => {
    try {
        const order = await orderModel.find({ isDeleted: false });

        if (!order) {
            return res.status(404).send({ staus: false, msg: "No order list" })
        }

        return res.status(200).send({ status: true, data: order })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
})
// getuser order list User Feature
const getorderUser = (async (req, res) => {
    try {
        let userId = req.params.userId
        const order = await orderModel.find({ isDeleted: false, userId: userId });

        if (!order) {
            return res.status(404).send({ staus: false, msg: "No order list" })
        }

        return res.status(200).send({ status: true, data: order })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
})


//Admin and user both Feature

const getorderbyid = (async (req, res) => {
    try {

        const { orderId } = req.body

        if (!orderId || orderId == "") {
            return res.status(400).send({ status: false, message: "Order Id is required" })
        }



        const order = await orderModel.findOne({ isDeleted: false, _id: orderId });

        if (!order) {
            return res.status(404).send({ staus: false, msg: "No order list" })
        }

        return res.status(200).send({ status: true, data: order })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
})




//User feature for cancelled the order

const updateOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const { orderId } = req.body

        if (!orderId || orderId == "") {
            return res.status(400).send({ status: false, message: "Order Id is required" })
        }
        const searchUser = await userModel.findOne({ _id: userId });

        if (!searchUser) {
            return res.status(404).send({ status: false, message: `user doesn't exist for ${userId}` });
        }



        const order = await orderModel.findOne({ _id: orderId, isDeleted: false, userId: userId })

        if (!order) {
            return res.status(404).send({ status: false, message: "Order not found for this userId" })
        }


        const orderCancelled = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'cancelled' } }, { new: true })

        const sendMail = require('../Email-setup/emailservices');
        sendMail({
            to: "rvsharma2652@gmail.com",
            subject: 'Order is Cancelled',
            html: require('../Email-setup/emailTemplate')({
                title: "Order is Cancelled",
                name: orderCancelled.shipping.name,
                orderId: orderCancelled.orderId,
                total: orderCancelled.subtotal,
                status: "Cancelled",
                items: orderCancelled.total,
                transcation: orderCancelled.transactionId
            })
        })
            .then(() => {
                return res.json({ success: true });
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ error: 'Error in email sending.' });
            });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

//Admin feature for delete the order

const deleteOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const { orderId } = req.body

        if (!orderId || orderId == "") {
            return res.status(400).send({ status: false, message: "Order Id is required" })
        }
        const searchUser = await userModel.findOne({ _id: userId });

        if (!searchUser) {
            return res.status(404).send({ status: false, message: `user doesn't exist for ${userId}` });
        }



        const order = await orderModel.findOne({ _id: orderId, isDeleted: false })

        if (!order) {
            return res.status(404).send({ status: false, message: "Order not found for this userId" })
        }


        const orderdelete = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'cancelled', isDeleted: true, deletedAt: Date.now().toString() } }, { new: true })

        return res.status(200).send({ status: true, message: "Order is Deleted Succesfully ", data: orderdelete })


    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

//=======================================================================================

module.exports = { updateOrder, getorder, getorderbyid, deleteOrder, getorderUser }

//=======================================================================================