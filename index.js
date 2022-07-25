const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const route = require("./routes/route")
const multer = require('multer')
const app = express()

app.use(bodyParser.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://rhutvik-patel:jiCI0diV4CDbN9Pr@cluster0.afbog.mongodb.net/group45Database", { useNewUrlParser: true })
.then(() => console.log("MongoDb is Connected..."))
.catch(err => console.log(err))

// app.use("/",route)

app.listen(3000, ()=>
    console.log("Express App Running On Port 3000")
)