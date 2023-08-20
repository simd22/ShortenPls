const mongoose = require('mongoose')
// library that creates unique short indentifier 
const shortId = require('shortid')

// Mongoose Schema acts as a blueprint for data should be organization/storage in database
const shortUrlSchema = new mongoose.Schema({
    full: { // name of col in DB, type, required
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate // auto runs fxn no need for ()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)