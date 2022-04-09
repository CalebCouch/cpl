const mongoose = require('mongoose')
const TeamsSchema = new mongoose.Schema({
	cupId: String,
    name: String,
    logo: String,
    members: Array,
    leader: Object
})
module.exports = mongoose.model('teams', TeamsSchema)