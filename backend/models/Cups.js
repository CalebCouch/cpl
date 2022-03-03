const mongoose = require('mongoose')
const CupsSchema = new mongoose.Schema({
    name: String,
    status: String,
    startDate: String,
    description: String,
    teamSize: String,
    mapOption: String,
    maps: String,
    prize: String,
    prizeDistribution: String,
})
module.exports = mongoose.model('quote', CupsSchema)