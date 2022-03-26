const mongoose = require('mongoose')
const Teams = require('./Teams')
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
    status: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
    winner: Array,
    dual: Boolean
})
module.exports = mongoose.model('cup', CupsSchema)