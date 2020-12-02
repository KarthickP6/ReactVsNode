const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://localhost/PetShop"
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on("open", function (req, res) {
  console.log("Connected")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const routerModule = require("./Router")
app.use("/api", routerModule)

app.listen(5000, function () {
  console.log("server started on port 3000")
})
