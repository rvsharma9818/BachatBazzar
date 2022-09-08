const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const USerroute = require("./routes/userRoutes")

const productroute = require("./routes/productRoute")

const Categoryroute = require("./routes/categoryRoute")

const Cartroute = require("./routes/cartRoute")

const contactRoute = require("./routes/contactRoute")

const Orderroute = require("./routes/orderRoute")

const Wishlist=require("./routes/WhislistRoute")

const payement = require("./routes/paymentRoute")

const app = express();

const path = require('path');

const {multererror } =require("./aws-setup/multer-err")

const cors = require("cors")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

.then(() => console.log("MongoDb is Connected..."))

.catch(err => console.log(err))

app.use(cors({
    origin:"*",
}))

app.use(express.static('dist/bachatbazzar'));

app.use("/bachatbazzar/user",USerroute)

app.use("/bachatbazzar/product",productroute)

app.use("/bachatbazzar/categoree",Categoryroute)

app.use("/bachatbazzar/cart",Cartroute)

app.use("/bachatbazzar/order",Orderroute)

app.use("/bachatbazzar/payement",payement)

app.use("/bachatbazzar/wishlist",Wishlist)

app.use("/bachatbazzar/contact",contactRoute)

app.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})

app.use(multererror)

app.listen(process.env.PORT || 3000, ()=>
 
console.log(`Express App Running On Port ${process.env.PORT || 3000}`)

)
