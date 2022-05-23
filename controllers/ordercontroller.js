const Order = require("../models/order.model");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");

//succesfully orderplace

exports.orderCreate = CatchAsyncError(async (req, res, next) => {
  try {
    const neworder = new Order({userId:req.body.userId,
      productId:req.body.productId,
      productTitle:req.body.productTitle,
      quantity:req.body.quantity,
    amount:req.body.amount,
  address:req.body.address});
    await neworder.save();
    res.status(200).json(neworder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a order

exports.updateorder = CatchAsyncError(async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete order by admin

exports.deleteOrder = CatchAsyncError(async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a order by user

exports.userdeleteOrder = CatchAsyncError(async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user order

exports.getuserorder = CatchAsyncError(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// all user order

exports.alluserorder = CatchAsyncError(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// display monthlyincome

exports.monthlyincome = CatchAsyncError(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
