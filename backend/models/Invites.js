const mongoose = require('mongoose')
const InvitesSchema = new mongoose.Schema({
	cupId: String,
	teamId: String,
	teamName: String,
	teamLogo: String,
    userId: String 
})
module.exports = mongoose.model('invites', InvitesSchema)