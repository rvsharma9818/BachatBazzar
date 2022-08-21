const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const USerroute = require("./src/routes/UserRoute")

const productroute = require("./src/routes/productRoute")

const Categoryroute = require("./src/routes/CategoryRoute")

const Cartroute = require("./src/routes/CartRoute")

const Orderroute = require("./src/routes/OrderRoute")

const app = express()

const {multererror } =require("./src/multer-error/error")

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