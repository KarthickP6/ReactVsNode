const mongoose = require("mongoose")

const Product = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  availableQty: Number,
  price: Number,
})

module.exports = mongoose.model("Product", Product)
