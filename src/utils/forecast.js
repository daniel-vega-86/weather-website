const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=28142186191f975ae2ac8762337eab90&query='+latitude+','+longitude+'&units=m'

    request({url, json: true},(error, {body}) => {
        if (error) {
            callback('No ha sido posible conectar con el servicio de clima.',undefined)
        } else if (body.error) {
            callback('No ha sido posible encontrar la locación.',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. actualmente se esta a ' + body.current.temperature + ' grados afuera. Se siente como ' + body.current.feelslike + ' grados. La humedad es ' + body.current.humidity + '%.')
        }
    })

}

module.exports = forecast