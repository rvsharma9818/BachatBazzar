const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const { isValidRequestBody, isValidObjectId, isValidStatus } = require('../validators/validate')


// User feature to place order
const orderCreation = async (req, res) => {
    try {
        let userId = req.params.userId;
        let requestBody = req.body;

        let { cartId, status, cancellable } = requestBody;

        if(requestBody.hasOwnProperty('cancellable')){
            if ((typeof cancellable !== "boolean")) {
                return res.status(400).send({ status: false, message: "cancellable should be a boolean value" });
            }
        }


        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId in params." });
        }

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request body. Please provide the the input to proceed." });
        }

        if (!cartId) {
            return res.status(400).send({ status: false, message: `Cart Id is required` });
        }

        if (!isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, message: `Invalid cartId in request body.` });
        }
        
        if (status) {
            if (status !== 'pending') {
                return res.status(400).send({ status: false, message: "status must be Pending during creation of order" })
            }
        }

            const searchUser = await userModel.findOne({ _id: userId });

            if (!searchUser) {
                return res.status(404).send({ status: false, message: `user doesn't exist for ${userId}` });
            }

            const searchCartDetails = await cartModel.findOne({ _id: cartId, userId: userId });

            if (!searchCartDetails) {
                return res.status(404).send({ status: false, message: `Cart doesn't belongs to ${userId}` });
            }

            if (!searchCartDetails.items.length) {
                return res.status(404).send({ status: false, message: `Please add some product in cart to make an order.` });
            }

            //adding quantity of every products

            const reducer = (previousValue, currentValue) => previousValue + currentValue;

            let totalQuantity = searchCartDetails.items.map((x) => x.quantity).reduce(reducer);

            const orderDetails = {
                userId: userId,
                items: searchCartDetails.items,
                totalPrice: searchCartDetails.totalPrice,
                totalItems: searchCartDetails.totalItems,
                totalQuantity: totalQuantity,
                cancellable,
                status,
            };
            const savedOrder = await orderModel.create(orderDetails);

            //Empty the cart after the successfull order

            if (status == 'pending' || savedOrder.status == 'pending') {
                await cartModel.findOneAndUpdate({ _id: cartId, userId: userId }, {
                    $set: {
                        items: [],
                        totalPrice: 0,
                        totalItems: 0,
                    },
                })
            };
    
            const sendMail = require('../EmailServices/emailservices');
    sendMail({
      to: "rvsharma2652@gmail.com",
      subject: 'Order is Succesfully placed',
      html: require('../EmailServices/emailtemplate')({
                title:"Your Order is Succesfully placed",
                name:searchUser.fname+" "+searchUser.lname, 
                orderId: savedOrder._id.toString() ,
                total:savedOrder.totalPrice,
                status:"Pending",
                items:savedOrder.totalItems
            })
    })
    .then(() => {
      return res.json({success: true});
    })
    .catch(err => {
        console.log(err)
      return res.status(500).json({error: 'Error in email sending.'});
    });
        }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Admin feature to see aorder list

const getorder =(async (req,res)=>{
try {
    const order =await orderModel.find({isDeleted:false});

    if(!order){
        return res.status(404).send({staus:false, msg:"No order list"})
    }

    return res.status(200).send({status:true,data:order})

} catch (error) {
return res.status(500).send({status:false,msg:error.message})    
}
})
// getuser order list User Feature
const getorderUser =(async (req,res)=>{
    try {
        let userId =req.params.userId
        const order =await orderModel.find({isDeleted:false,userId:userId});
    
        if(!order){
            return res.status(404).send({staus:false, msg:"No order list"})
        }
    
        return res.status(200).send({status:true,data:order})
    
    } catch (error) {
    return res.status(500).send({status:false,msg:error.message})    
    }
    })
    

//Admin and user both Feature

const getorderbyid =(async (req,res)=>{
    try {

        const { orderId } = req.body

        if (!orderId || orderId == "") {
            return res.status(400).send({ status: false, message: "Order Id is required" })
        }
        
        
        if (!isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: "Please provide a valid orderId " })
        }

        const order =await orderModel.findOne({isDeleted:false,_id:orderId});
    
        if(!order){
            return res.status(404).send({staus:false, msg:"No order list"})
        }
    
        return res.status(200).send({status:true,data:order})
    
    } catch (error) {
    return res.status(500).send({status:false,msg:error.message})    
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
        
        if (!isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: "Please provide a valid orderId " })
        }


        const order = await orderModel.findOne({ _id: orderId, isDeleted: false, userId: userId })

        if (!order) {
            return res.status(404).send({ status: false, message: "Order not found for this userId" })
        }

        if ( order.cancellable == false) {
            return res.status(400).send({ status: false, message: "Order is not cancellable" })
        }

            const orderCancelled = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'cancelled' } }, { new: true })
        
            const sendMail = require('../EmailServices/emailservices');
            sendMail({
              to: "rvsharma2652@gmail.com",
              subject: 'Order is Cancelled',
              html: require('../EmailServices/emailtemplate')({
                        title:"Order is Cancelled",
                        status:"Cancelled",
                        name:searchUser.fname+" "+searchUser.lname, 
                        orderId: orderCancelled._id.toString() ,
                        total:orderCancelled.totalPrice,
                        items:orderCancelled.totalItems
                    })
            })
            .then(() => {
              return res.json({success: true});
            })
            .catch(err => {
                console.log(err)
              return res.status(500).json({error: 'Error in email sending.'});
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
        
        if (!isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: "Please provide a valid orderId " })
        }


        const order = await orderModel.findOne({ _id: orderId, isDeleted: false})

        if (!order) {
            return res.status(404).send({ status: false, message: "Order not found for this userId" })
        }

        
    const orderdelete= await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'cancelled',isDeleted:true,deletedAt:Date.now().toString() } }, { new: true })
        
    return res.status(200).send({ status: true, message: "Order is Deleted Succesfully " ,data:orderdelete})

            
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

//=======================================================================================

module.exports = { orderCreation, updateOrder,getorder,getorderbyid,deleteOrder,getorderUser }

//=======================================================================================