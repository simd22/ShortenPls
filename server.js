const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

// connects Node.js app MongoDB database using the Mongoose library
// mongodb://localhost/myUrlShortener // for debugging
mongoose.connect('mongodb+srv://sd:BBahkvA6o3JcCPMi@cluster0.ggxwb4z.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser : true, useUnifiedTopology : true
})

// ejs as view engine, create templates with placeholders for dynamic data
app.set('view engine', 'ejs') 
// to properly work with express, say we're using urls
app.use(express.urlencoded({ extended: false })) 

// gets data from server, sets entry point/root path (index)
// request - incoming HTTP request from client's browser; response - send data back to the client's browser
app.get('/', async (req, res)=> {
    const shortUrls = await ShortUrl.find() // gets all urls from urls table
    res.render('index', {shortUrls: shortUrls})
})

// posts data to server, async/await
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/') // redirect user to homepage
})

// gets any route after first slash and saves in shortUrl
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks ++
    shortUrl.save()
    res.redirect(shortUrl.full)
}) 

app.listen(process.env.PORT || 5000);
