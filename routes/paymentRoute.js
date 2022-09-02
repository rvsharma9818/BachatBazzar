const Stripe = require("stripe")("sk_test_51KGmCqSFlzgfGUwqeOmGYi3WOLxD0Cv6h73rVZacTm04ZlcHix5oe4ygEQwyEWGd2xPX1lrvKJsUjqDANX6melqn00fmJcuBPu");
const express = require("express"); 
const { Order } = require("../models/orderModel");
const CartModel = require("../models/cartModel")

require("dotenv").config();


const router = express.Router();

router.post("/create-checkout-session/", async (req, res) => {
    try{
const userId=req.body.userId
const Cart = await CartModel.findOne({userId:"6304e0b32c6028d3bd050a52"}).populate("items.productId")
  const customer = await Stripe.customers.create({
    metadata: {
      userId: userId,
    },
  });
//   console.log(Cart.items)
  const line_items =Object.values(Cart.items).map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productId.title,
          images: [item.productId.productImage],
          metadata: {
            id: item.productId._id,
          },
        },
        unit_amount: 9000* 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `http://localhost:3000/checkout-success`,
    cancel_url: `http://localhost:3000/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
}catch(err){
    return res.send(err)
}
});

// Create order function

const createOrder = async (customer, data) => {
  
  try {
    const Items = JSON.parse(customer.metadata.cart);
console.log(Items)
    const products = Items.map((item) => {
      return {
        productId: item.id,
        quantity: item.cartQuantity,
      };
    });
  
    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
    console.log(newOrder)
      await CartModel.findOneAndUpdate({ userId: customer.metadata.userId }, {
          $set: {
              items: [],
              totalPrice: 0,
              totalItems: 0,
          },
        })
        
        const savedOrder = await newOrder.save();
  const sendMail = require('../Email-setup/emailservices');
  sendMail({
  to: "rvsharma2652@gmail.com",
  subject: 'Order is Succesfully placed',
  html: require('../Email-setup/emailTemplate')({
      title:"Your Order is Succesfully placed",
      name:searchUser.name, 
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
    } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = Stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
        
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      Stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

module.exports = router;