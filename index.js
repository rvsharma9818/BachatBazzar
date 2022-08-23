const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const USerroute = require("./routes/userRoutes")

const productroute = require("./routes/productRoute")

const Categoryroute = require("./routes/cartRoute")

const Cartroute = require("./routes/cartRoute")

const Orderroute = require("./routes/orderRoute")

const app = express()

const {multererror } =require("./aws-setup/multer-err")

const cors = require("cors")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

.then(() => console.log("MongoDb is Connected..."))

.catch(err => console.log(err))

app.use(cors())

app.use("/bachatbazzar/user",USerroute)

app.use("/bachatbazzar/product",productroute)

app.use("/bachatbazzar/categoree",Categoryroute)

app.use("/bachatbazzar/cart",Cartroute)

app.use("/bachatbazzar/order",Orderroute)


app.use(multererror)

app.listen(process.env.PORT, ()=>
 
console.log("Express App Running On Port 3000")

)