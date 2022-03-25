const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    id: String,
    picture: String
})
module.exports = mongoose.model('users', UsersSchema)