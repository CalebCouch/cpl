const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Get all routes
router.get('/', async (req, res) => {
	const user = await User.find();
	res.json(user);
});

// Create new quote
router.post('/new', async (req, res) => {
	const newUser = new User(req.body);
	
	const savedUser = await newUser.save();

	res.json(savedUser);
});

router.patch('/update/:id', async (req, res) => {
	const q = await User.updateOne({_id: req.params.id}, {$set: req.body});
	res.json(q);
});

module.exports = router;