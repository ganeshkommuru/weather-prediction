const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()

//
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index.hbs',{
        name: 'Ganesh',
        title: 'Weather Info Page',
    })
})

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        name: 'Ganesh',
        title: 'Help Page',
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        name: 'Ganesh',
        title: 'About Page',
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'No address Provided'
        })
    }
    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                error: 'unable to fetch geocode'
            })
        }
        weatherstack(data.latitude,data.longitude,(error,weatherData)=>{
            if(error){
                return res.send({
                    error: 'Unable to fetch weather info'
                })
            }
            return res.send({
                address: data.location,
                temperature: weatherData.temperature,
                feelslike: weatherData.feelslike,
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.send(
        '<h1>404 Page not found</h1>'
    )
})

app.listen(3000)