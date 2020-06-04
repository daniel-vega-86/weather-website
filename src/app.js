const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define caminos para la configuracion de expres
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// configurando motos de handlebars y localizacion de la carpeta views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// configurando directorio estacionario al servidor
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Clima',
        name: 'Daniel Vega'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Acerca de',
        name: 'Daniel Vega'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Ayuda',
        helpText: 'Informacion util para ti',
        name: 'Daniel Vega'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Dede ingresar una ubicación!'})
    }

    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude,latitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Debe ingresar un termino de busqueda!'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorText: 'Articulo de ayuda no encontrado.',
        name:'Daniel Vega'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Pagina no encontrada.',
        name: 'Daniel Vega'
    })
})

app.listen(3000, () => {
    console.log('Servidor esta en el puesto 3000')
})