const mongoose = require('mongoose')
const User = require('./Users')
const TeamsSchema = new mongoose.Schema({
	cupId: String,
    name: String,
    logo: String,
    members: Array,
    leader: Object
})
module.exports = mongoose.model('teams', TeamsSchema)