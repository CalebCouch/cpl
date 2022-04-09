const express = require('express');
const router = express.Router();
const Invite = require('../models/Invites');

// Get all routes
router.get('/', async (req, res) => {
	const invite = await Invite.find();
	res.json(invite);
});

// Create new quote
router.post('/new', async (req, res) => {
	console.log(req)
	const newInvite = new Invite(req.body);
	
	const savedInvite = await newInvite.save();

	res.json(savedInvite);
});

router.patch('/update/:id', async (req, res) => {
	const q = await Invite.updateOne({_id: req.params.id}, {$set: req.body});
	res.json(q);
});

module.exports = router;