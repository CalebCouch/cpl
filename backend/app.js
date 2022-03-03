const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const moment = require("moment")

// create our express app
const app = express()

// database

const uri = "mongodb+srv://QuantumTiger:tense-bullyboy-umlaut@cplcluster.f5pkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

// middleware
app.use(cors())
app.use(bodyParser.json())

// discord

// routes
app.get("/", (req,res)=>{
    res.send("my home page dey show sha")
})

const CupsRoute = require('./routes/Cups')
app.use('/cups', CupsRoute)

//start server
app.listen(3000, ()=>{
    console.log("listening at port:3000")
})   