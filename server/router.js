const app = require("express")
const router = app.Router()
const Product = require("./model/product")
const Cart = require("./model/cart")
const cart = require("./model/cart")
router.get("/product/", (req, res) => {
  Product.find((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.post("/product/", (req, res) => {
  // console.log("Post is::" + req.body)
  const newObj = new Product({
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    availableQty: req.body.availableQty,
    price: req.body.price,
  })
  newObj.save((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.delete("/cart/:id", (req, res) => {
  Cart.findByIdAndDelete({ _id: req.params.id }, (err, item) => {
    if (!err) res.send("Deleted Successfully")
    else res.send(err)
  })
})

router.delete("/product/:id", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }, (err, item) => {
    if (!err) res.send("Deleted Successfully")
    else res.send(err)
  })
})

router.delete("/cart/", (req, res) => {
  console.log("Reached" + req.body.id)
  Cart.findOneAndRemove({ id: req.body.id }, (err, item) => {
    if (!err) res.send("Deleted successfully")
    else res.send(err)
  })
})

router.get("/cart/", (req, res) => {
  Cart.find((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.post("/cart/", (req, res) => {
  console.log("Request is ::" + req.body)
  const newObj = new Cart({
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    availableQty: req.body.availableQty,
    price: req.body.price,
    qty: 1,
  })

  Cart.findOne({ id: req.body.id }, (err, item) => {
    if (!err) {
      if (item !== null) {
        const updateObj = {
          id: req.body.id,
          image: req.body.image,
          title: req.body.title,
          description: req.body.description,
          availableQty: req.body.availableQty,
          price: req.body.price,
          qty: item.qty + 1,
        }

        Cart.findOneAndUpdate(
          { id: req.body.id },
          { $set: updateObj },
          { new: true },
          (err1, item1) => {
            if (!err1) res.send(item1)
            else res.send(err1)
          }
        )
      } else {
        console.log("Item is::" + newObj)
        newObj.save((err2, item2) => {
          if (!item2) res.send(item2)
          else res.send(err2)
        })
      }
    } else res.send(err)
  })
})

module.exports = router
