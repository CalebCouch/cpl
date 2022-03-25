const express = require('express');
const router = express.Router();
const Cup = require('../models/Cups');
const Discord = require("discord.js");
const moment = require('moment')
const config = require("../../discord.json")
const client = new Discord.Client({intents: ["GUILD_MESSAGE_REACTIONS", "GUILDS", "GUILD_MESSAGES"], partials: ['MESSAGE', 'GUILD_MEMBER', 'CHANNEL', 'REACTION']});
client.login(config.BOT_TOKEN);

// Get all routes
router.get('/', async (req, res) => {
	const cup = await Cup.find();

	res.json(cup);
});

// Create new quote
router.post('/new', async (req, res) => {
	const newCup = new Cup(req.body);
	
	const savedCup = await newCup.save();

	res.json(savedCup);
});

router.post('/newPending', async (req, res) => {
	const newCup = new Cup(req.body);
	const savedCup = await newCup.save();
	
	
	await client.channels.cache.get('947559836286074924')
	.send('Hello here!')
	.then((message) => {
		console.log(message)
		message.react('👍').then(() => message.react('👎'));
		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name);
		};
		message.awaitReactions({ filter, time: moment.duration(1, "minute").asMilliseconds()})
		.then(collected => {
			const yes = collected.first().count
			const no = collected.last().count
			const id = savedCup._id
			if (yes > no) {
				console.log("vote approved", id)
				Cup.updateOne({_id: id}, {$set: {status: "approved"}}).then((q) => {
					res.json(q);
				})
			} else {
				console.log("vote failed", id)
				const result = Cup.findByIdAndDelete({ _id: id }).then((q) => {
					res.json(q)
				})
			}
		})
		.catch(collected => {
			console.error("error on reaction collection", collected)
		});
		
	}).catch(console.error);
	
});

// Get specific quote
router.get('/get/:id', async (req, res) => {
	const q = await Cup.findById({ _id: req.params.id });

	res.json(q);
});

// Delete a quote
router.delete('/delete/:id', async (req, res) => {
	const result = await Cup.findByIdAndDelete({ _id: req.params.id });

	res.json(result);
});

// Update a quote
router.patch('/update/:id', async (req, res) => {
	const q = await Cup.updateOne({_id: req.params.id}, {$set: req.body});

	res.json(q);
});

// Get random quote
router.get('/random', async (req, res) => {
	const count = await Cup.countDocuments();
	const random = Math.floor(Math.random() * count);
	const q = await Cup.findOne().skip(random);

	res.json(q);
});

module.exports = router;