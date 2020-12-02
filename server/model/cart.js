const mongoose = require("mongoose")

const Cart = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  availableQty: Number,
  price: Number,
  qty: Number,
})

module.exports = mongoose.model("Cart", Cart)
