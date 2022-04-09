const bodyParser = require("body-parser")
const Cup = require('./models/Cups');
const mongoose = require("mongoose")
const express = require("express")
const moment = require("moment")
const envy = require('envy');
const cors = require("cors")
const env = envy();
console.log(env);
// create our express app
const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

// database

const uri = env.mongoUri;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

// middleware
// app.use(cors())
app.use(bodyParser.json())

// discord

// routes
app.get("/", (req,res)=>{
    res.send("my home page dey show sha")
})

const CupsRoute = require('./routes/Cups')
app.use('/cups', CupsRoute)

const UsersRoute = require('./routes/Users')
app.use('/users', UsersRoute)

const TeamsRoute = require('./routes/Teams')
app.use('/teams', TeamsRoute)

const InvitesRoute = require('./routes/Invites')
app.use('/invites', InvitesRoute)

//start server
app.listen(3000, ()=>{
    console.log("listening at port:3000")
})   


async function bouncy () {
	const cups = await Cup.find();
	var current = moment()
  	for (let i = 0; i < cups.length; i++) {
  		const cup = cups[i]
    	const timeLeft = moment.duration(moment(cup.startDate, "YYYY-MM-DD").diff(current))._milliseconds
    	if (parseInt(timeLeft) < 0 && cup.status == "approved") {
    		Cup.updateOne({_id: cup._id}, {$set: {status: "started"}});
    		const q = await Cup.updateOne({_id: cup.id}, {$set: {status: "started"}});
			console.log(q)
    	}
  	}
	setTimeout(() => {bouncy()}, 1000)
}
bouncy()