const stripe = require("stripe")("sk_test_51KGmCqSFlzgfGUwqeOmGYi3WOLxD0Cv6h73rVZacTm04ZlcHix5oe4ygEQwyEWGd2xPX1lrvKJsUjqDANX6melqn00fmJcuBPu");


exports.payement=  (async(req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
  line_items: [{
    price_data: {
      // The currency parameter determines which
      // payment methods are used in the Checkout Session.
      currency: 'eur',
      product_data: {
        name: 'T-shirt',
      },
      unit_amount: 2000,
    },
    quantity: 1,
  }],
        mode: 'payment',
        success_url: `https://www.youtube.com/watch?v=caFlZcMvZGE`,
        cancel_url: `https://www.youtube.com/watch?v=caFlZcMvZGE`,
      });
console.log(session) 
res.send( session.url);

    } catch (error) {
        console.log(error)
      return false;
    }
})