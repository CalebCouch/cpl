const mongoose = require('mongoose')
const CupsSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    prize: String,
    startDate: String,
    mapOption: String,
    maps: String,
    teamSize: String,
    prizeDistribution: String,
    matchGenerator: String,
    status: String
})
module.exports = mongoose.model('cup', CupsSchema)