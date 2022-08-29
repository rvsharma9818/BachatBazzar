const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const USerroute = require("./routes/userRoutes")

const productroute = require("./routes/productRoute")

const Categoryroute = require("./routes/categoryRoute")

const Cartroute = require("./routes/cartRoute")

const Orderroute = require("./routes/orderRoute")

const Wishlist=require("./routes/WhislistRoute")


const app = express()

const {multererror } =require("./aws-setup/multer-err")

const cors = require("cors")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

.then(() => console.log("MongoDb is Connected..."))

.catch(err => console.log(err))

app.use(cors({
    origin: '*'
}))

app.use("/bachatbazzar/user",USerroute)

app.use("/bachatbazzar/product",productroute)

app.use("/bachatbazzar/categoree",Categoryroute)

app.use("/bachatbazzar/cart",Cartroute)

app.use("/bachatbazzar/order",Orderroute)

// app.use("/bachatbazzar/payement",Payement)

app.use("/bachatbazzar/wishlist",Wishlist)

app.use(multererror)

app.listen(process.env.PORT || 3000, ()=>
 
console.log(`Express App Running On Port ${process.env.PORT || 3000}`)

)
