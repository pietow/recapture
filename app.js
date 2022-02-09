/** @format */

const express = require('express')
require('dotenv').config()
const { engine } = require('express-handlebars')
const path = require('path')
const fetch = require('node-fetch')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
const port = process.env.PORT || 5500
app.use(express.urlencoded({ extend: true }))

app.get('/', function (req, res) {
    res.render('index')
})
app.post('/capture', (req, res) => {
    /* console.log('bla') */
    /* console.log(req.body) */
    const token = req.body['g-recaptcha-response']
    console.log(token)
    const secret = 'YOUR SECRET KEY GOES HERE!!!'
    fetch('https://www.google.com/recaptcha/api/siteverify?secret='+secret+'&response='+token, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
    res.redirect(303, '/')
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
