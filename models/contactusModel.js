const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
   message:{
    type:String,
    reuired:true,
   },
   Subject:{
   type :String,
   required:true
   },
   
  }, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);