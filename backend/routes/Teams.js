const express = require('express');
const router = express.Router();
const Team = require('../models/Teams');

// Get all routes
router.get('/', async (req, res) => {
	const team = await Team.find();
	res.json(team);
});

// Create new quote
router.post('/new', async (req, res) => {
	const newTeam = new Team(req.body);
	
	const savedTeam = await newTeam.save();

	res.json(savedTeam);
});

router.patch('/update/:id', async (req, res) => {
	console.log("highanonet")
	console.log(req.body)
	const q = await Team.updateOne({_id: req.params.id}, {$set: req.body});
	res.json(q);
});

module.exports = router;