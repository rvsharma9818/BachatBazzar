const userModel = require("../models/usermodel");


const orderModel = require("../models/orderModel");



const getorder = (async (req, res) => {

    try {

        const order = await orderModel.find({ isDeleted: false });


        if (!order) {

            return res.status(404).send({ staus: false, msg: "No order list" })

        }

        return res.status(200).send({ status: true, data: order })

    } catch (error) {
        
        return res.status(500).send({ status: false, msg: 'Something Went Wrong' })

    }

})

const getorderUser = (async (req, res) => {

    try {

        let userId = req.params.userId

        const order = await orderModel.find({ isDeleted: false, userId: userId });


        if (!order) {

            return res.status(404).send({ staus: false, msg: "No order list" })

        }

        return res.status(200).send({ status: true, data: order })

    } catch (error) {
       
        return res.status(500).send({ status: false, msg: 'Something Went Wrong' })
    
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

        return res.status(500).send({ status: false, msg: 'Something Went Wrong' })

    }

})




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
        

        if (order.status=='cancelled') {

            return res.status(404).send({ status: false, message: "Order Is Already Cancelled" })

        }

        const orderCancelled = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'cancelled' } }, { new: true })

        const sendMail = require('../Email-setup/emailservices');
        
        sendMail({
            to: orderCancelled.shipping.email,

            
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
        
        
            return res.status(500).json({ error: 'Error in email sending.' });
        
        });

    } 
    catch (error) {
    
        return res.status(500).send({ status: false, error: 'Something Went Wrong' })
    
    }

}

//Admin feature for delete the order

const deleteOrder = async function (req, res) {
    try {
        
        const userId = req.params.userId
        
        const  orderId  = req.params.orderId

        
        if (!orderId || orderId == "") {
        
            return res.status(400).send({ status: false, message: "Order Id is required" })
        
        }
        
        const searchUser = await userModel.findOne({ _id: userId });

        if (!searchUser) {
        
            return res.status(404).send({ status: false, message: `user doesn't exist for ${userId}` });
        
        }

        const order = await orderModel.findOne({ _id: orderId, isDeleted: false })

        if (order.status != 'cancelled') {

            return res.status(404).send({ status: false, message: "Order Is Pending Status" })

        }

        if (!order) {

            return res.status(404).send({ status: false, message: "Order not found for this userId" })

        }


        await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { isDeleted: true, deletedAt: Date.now().toString() } }, { new: true })

        return res.status(200).send({ status: true, message: "Order is Deleted Succesfully " })


    } catch (error) {

        return res.status(500).send({ status: false, error:'Something Went Wrong' })

    }

}


module.exports = { updateOrder, getorder, getorderbyid, deleteOrder, getorderUser }

//=======================================================================================
