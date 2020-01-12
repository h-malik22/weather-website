const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
const author = {name: 'Hasan'}

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: author.name
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: author.name
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Helpful text',
        title: 'About me',
        name: author.name
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.location){
        return res.send('Error, no valid location provided')
    }
    geocode(req.query.location, (error, geoData)=>{ //destructuring object
        if(error){
            return res.send({error:'Unable to find location. Try another search' })
        }

        forecast(geoData.latitude, geoData.longitude, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({forecastError})        
            }

            res.send(
                {
                    temperature: forecastData.celciusTemp + 'C',
                    summary: forecastData.summary,
                    location: geoData.location
                }
            )
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: author.name
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: author.name
    })
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})