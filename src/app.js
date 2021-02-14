const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: "Graeme Thorpe"
    })
})

app.get('/about', (req, res) => {
     res.render('about', {
        title: "What about me?? It isn't fair.",
        subTitle: "I've had enough, now I want my share!!'",
        name: "Graeme Thorpe"
     })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help me Rhonda...",
        subTitle:"Help, help me Rhonda!",
        message: "Help? What do you think this is... Gift Week for Spasdics",
        name: "Graeme Thorpe "
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'Please include a search address'
        })
    }

    const address = (req.query.address)

    geocode(address, (error,{ latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }
         forecast(latitude, longitude, (error,forcastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forcastData,
                location,
                address
            })    
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found sorry'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        message: "I'm sorry - Page not found"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
}) 