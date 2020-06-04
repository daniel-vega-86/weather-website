const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGV2ZWg5MSIsImEiOiJja2Foam4xdDEwa3p0MnNua3BxcXhsc2dqIn0.N-IN1hrNxLWgftOwkxSYXg&limit=1'
    
    request({url, json: true}, (error,{body})=>{
        if (error) {
            callback('No ha sido posible conectar con el servicio de localizacion!', undefined)
        } else if (body.features.length === 0) {
            callback('No ha sido posible encontrar la locación. Intente otra busqueda.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode