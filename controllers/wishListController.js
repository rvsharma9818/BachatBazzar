const WhishlistModel = require('../models/wishListmodel');

const productModel = require('../models/productModel');

const userModel = require('../models/usermodel');

const wishlistCreation = async (req, res) => {
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

        const findWishlistOfUser = await WhishlistModel
      
        .findOne({ userId: userId });

      
        let e = findProduct.price

        if (!findWishlistOfUser) {
            
            var WhishlistData = {
            
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
            
            const createWhislist = await WhishlistModel
            
            .create(WhishlistData);
            
            return res.status(201).send({ status: true, message: `Cart created successfully`, data: createWhislist });
        }

        if (findWishlistOfUser) {

            let price = findWishlistOfUser.totalPrice + quantity * findProduct.price;

            let arr = findWishlistOfUser.items;

            for (i in arr) {
                if (arr[i].productId.toString() === productId) {
                    arr[i].quantity += quantity;
                    let updatedCart = {
                        items: arr,
                        totalPrice: price,
                        totalItems: arr.length,
                    };

                    let responseData = await WhishlistModel
                        .findOneAndUpdate(
                            
                            { _id: findWishlistOfUser._id },
                            
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

            
            let responseData = await WhishlistModel
            
            .findOneAndUpdate({ _id: findWishlistOfUser._id }, updatedCart, { new: true });
            
            return res.status(200).send({ status: true, message: `Product added successfully`, data: responseData });
        }
    } catch (error) {
        
        return res.status(500).send({ status: false, message: 'Something Went Wrong'});
    }
};


const getWishlist = async (req, res) => {
    try {

        let userId = req.params.userId;

        const findUserProfile = await userModel.findById({ _id: userId })

        if (!findUserProfile) {

            return res.status(400).send({ status: false, message: `User doesn't exists by ${userId}` })

        }

        const findWishlist = await WhishlistModel

        .findOne({ userId: userId }).populate("items.productId", { title: 1, price: 1, productImage: 1, availableSizes: 1, shortdescription: 1 })

        .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });


        if (!findWishlist) {

            return res.status(404).send({ status: false, message: `Cart doesn't exists by ${userId} ` });

        }

        return res.status(200).send({ status: true, message: "Successfully fetched cart.", data: findWishlist });

    } catch (error) {

        return res.status(500).send({ status: false, message: "Something Went Wrong"  });

    }

};




const updateWishlist = async function (req, res) {
    try {

        const userId = req.params.userId

        let { productId, removeProduct } = req.body

        productId = productId

        removeProduct = removeProduct


        if (!productId) {

            return res.status(400).send({ status: false, message: "productId must be required..." })

        }




        if (!removeProduct && removeProduct != 0) {

            return res.status(400).send({ status: false, message: "removeProduct key must be required..." })

        }



        const WishlistInDB = await WhishlistModel

        .findOne({ userId: userId })


        if (!WishlistInDB) {

            return res.status(404).send({ status: false, message: "cartId does not exist" })

        }

        const productInDB = await productModel.findOne({ _id: productId, isDeleted: false })

        if (!productInDB) {

            return res.status(404).send({ status: false, message: "productId does not exist" })

        }

        const productIdInWishlist = await WhishlistModel

        .findOne({ userId: userId, "items.productId": productId })


        if (!productIdInWishlist) {
        
            return res.status(404).send({ status: false, message: "productId does not exist in this cart" })
        
        }
        
        let { items } = WishlistInDB
        
        let getPrice = productInDB.price

        
        for (let i = 0; i < items.length; i++) {
        
            if (items[i].productId == productId) {


                
                let totelProductprice = items[i].quantity * getPrice

                
                if (removeProduct == 0 || (items[i].quantity == 1 && removeProduct == 1)) {

                
                    const removeWishlist = await WhishlistModel
                
                    .findOneAndUpdate({ userId: userId },
                
                        {
                
                            $pull: { items: { productId: productId } },
                
                            $inc: {
                
                                totalPrice: - totelProductprice,
                
                                totalItems: - 1
                
                            }
                
                        },
                
                        { new: true })
                
                        return res.status(200).send({ status: true, message: 'sucessfully removed product from cart', data: removeWishlist })
                }

            }
        }
    } catch (error) {
        
        return res.status(500).send({ status: false, error: 'Something Went Wrong' })
    
    }

}


const deletewhishlist = async (req, res) => {

    try {

        let userId = req.params.userId.toString().trim()


        const findUserWhislist = await WhishlistModel
        
        .findOne({ userId: userId })

        if (!findUserWhislist) {
        
            return res.status(404).send({ status: false, message: "User doesn't exist" })
    
        }

        if (findUserWhislist.items.length == 0) {
    
            return res.status(400).send({ status: false, message: "Products are already deleted in the cart" })
    
        }

        await WhishlistModel
    
        .findOneAndUpdate({ userId: userId }, { $set: { items: [], totalItems: 0, totalPrice: 0 } }, { new: true })

    
        return res.status(204).send({ status: true, message: "Cart Deleted Successfully" })
    
    }catch (error) {
    
        return  res.status(500).send({ status: false, message: 'Something Went Wrong' });
    
    }

}


module.exports = { wishlistCreation, getWishlist, updateWishlist, deletewhishlist }
