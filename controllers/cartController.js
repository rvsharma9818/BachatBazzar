const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const userModel = require('../models/usermodel');

//=================================================================================================================

const cartCreation = async (req, res) => {
    try {
        let userId = req.params.userId;

        userId = userId?.toString().trim()


        let requestBody = req.body;


        let { cartId, productId, quantity } = requestBody;

        productId = productId?.toString().trim()

        cartId = cartId?.toString().trim()


        if (req.body.quantity <= 0) return res.status(400).send({ status: false, message: "Quantity Should Be a Number and Greater than Zero" });

        if (!quantity) { quantity = 1 }


        const findUser = await userModel.findById({ _id: userId });

        if (!findUser) {

            return res.status(404).send({ status: false, message: `User doesn't exist by ${userId}` });
        }

        const findProduct = await productModel.findOne({ _id: productId, isDeleted: false });

        if (!findProduct) {

            return res.status(404).send({ status: false, message: `Product doesn't exist by ${productId}` });

        }

        const findCartOfUser = await cartModel.findOne({ userId: userId });

        let e = findProduct.price

        if (!findCartOfUser) {
            
            var cartData = { 
            
                userId: userId,
            
                items: [
                    {
                        productId: productId,
                        quantity: quantity,
                    },
                ],
            
                totalPrice: findProduct.price * quantity,

                totalItems: 1
            };
            
            const createCart = await cartModel.create(cartData);
            
            return res.status(201).send({ status: true, message: `Cart created successfully`, data: createCart });
        
        }

        if (findCartOfUser) {

            let price = findCartOfUser.totalPrice + quantity * findProduct.price;

            let arr = findCartOfUser.items;

            for (i in arr) {
                if (arr[i].productId.toString() === productId) {
                    arr[i].quantity += quantity;
                    let updatedCart = {
                        items: arr,
                        totalPrice: price,
                        totalItems: arr.length,
                    };

                    let responseData = await cartModel.findOneAndUpdate(
                        { _id: findCartOfUser._id },
                        updatedCart,
                        { new: true }
                    );
                    return res.status(200).send({ status: true, message: `Product added successfully`, data: responseData });
                }
            }
            arr.push({ productId: productId, quantity: quantity });

            let updatedCart = {
                items: arr,
                totalPrice: price,
                totalItems: arr.length,
            };

            let responseData = await cartModel.findOneAndUpdate({ _id: findCartOfUser._id }, updatedCart, { new: true });
        
            return res.status(200).send({ status: true, message: `Product added successfully`, data: responseData });
        }
    
    } catch (error) {
        
        return res.status(500).send({ status: false, message:'Something Went Wrong' });
    }
};


//============================================================== Get Cart details ==============================================================

const getCart = async (req, res) => {
    try {
        let userId = req.params.userId;

        
        const findUserProfile = await userModel.findById({ _id: userId })
        
        if (!findUserProfile) {
        
            return res.status(400).send({ status: false, message: `User doesn't exists by ${userId}` })
        
        }

         
        const findCart = await cartModel.findOne({ userId: userId }).populate("items.productId", { title: 1, price: 1, productImage: 1, availableSizes: 1,shortdescription:1 })
        
        .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });

        if (!findCart) {
        
            return res.status(404).send({ status: false, message: `Cart doesn't exists by ${userId} ` });
        
        }

        
        return res.status(200).send({ status: true, message: "Successfully fetched cart.", data: findCart });
    } 
    catch (error) {
    
        return res.status(500).send({ status: false, message: 'Something Went Wrong' });
    
    }
};


//=================================================================================================================


const updateCart = async function (req, res) {
    try {

        const userId = req.params.userId
        
        let { productId, cartId, removeProduct } = req.body

        productId = productId
        
        cartId = cartId
        
        removeProduct = removeProduct

       
        if (!productId) {
           
            return res.status(400).send({ status: false, message: "productId must be required..." })
        
        }



        if (!removeProduct && removeProduct != 0) {
        
            return res.status(400).send({ status: false, message: "removeProduct key must be required..." })
        
        }
        
        if (!(removeProduct == "1" || removeProduct == "0")) {
        
            return res.status(400).send({ status: false, message: "removeProduct value only can be 0 or 1" })
        
        }

        const cartInDB = await cartModel.findOne({userId : userId})

        if (!cartInDB) {
        
            return res.status(404).send({ status: false, message: "cartId does not exist" })
        }

        const productInDB = await productModel.findOne({ _id: productId, isDeleted: false })

        if (!productInDB) {
        
            return res.status(404).send({ status: false, message: "productId does not exist" })
        }

        const productIdInCart = await cartModel.findOne({ userId: userId, "items.productId": productId })

        if (!productIdInCart) {
        
            return res.status(404).send({ status: false, message: "productId does not exist in this cart" })
        }
        
        let { items } = cartInDB
        
        let getPrice = productInDB.price

        for (let i = 0; i < items.length; i++) {
        
            if (items[i].productId == productId) {

                let totelProductprice = items[i].quantity * getPrice

                if (removeProduct == 0 || (items[i].quantity == 1 && removeProduct == 1)) {

                    const removeCart = await cartModel.findOneAndUpdate({ userId: userId },
                        {
                            $pull: { items: { productId: productId } },
                            $inc: {
                                totalPrice: - totelProductprice,
                                totalItems: - 1
                            }
                        },
                        { new: true })
        
                        return res.status(200).send({ status: true, message: 'sucessfully removed product from cart', data: removeCart })
                }

        
                const product = await cartModel.findOneAndUpdate({ "items.productId": productId, userId: userId }, { $inc: { "items.$.quantity": -1, totalPrice: -getPrice } }, { new: true })

                return res.status(200).send({ status: true, message: 'sucessfully decrease one quantity of product', data: product })
        
            }
        
        }
    } catch (error) {
        
        return res.status(500).send({ status: false, error:'Something Went Wrong' })
    
    }
}



const deleteCart = async (req, res) => {
    try {
        let userId = req.params.userId.toString().trim()

        const findUserCart = await cartModel.findOne({ userId: userId })

        if (!findUserCart) {

            return res.status(404).send({ status: false, message: "User doesn't exist" })
        }

        if (findUserCart.items.length == 0) {

            return res.status(400).send({ status: false, message: "Products are already deleted in the cart" })
        }

        await cartModel.findOneAndUpdate({ userId: userId }, { $set: { items: [], totalItems: 0, totalPrice: 0 } }, { new: true })

        return res.status(204).send({status: true, message: "Cart Deleted Successfully"})
    } 
    catch (error) {
        
        return res.status(500).send({ status: false, message: 'Something Went Wrong' });
    }
}


module.exports = { cartCreation, getCart, updateCart, deleteCart }

//=================================================================================================================