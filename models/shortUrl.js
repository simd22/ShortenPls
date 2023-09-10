const mongoose = require('mongoose')
// library that creates unique short indentifier 
const shortId = require('shortid') 

// Mongoose Schema - blueprint for how data organization/storage in database
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate // auto runs
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)