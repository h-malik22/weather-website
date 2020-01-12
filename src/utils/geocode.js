
const request = require('request')

const geocode = (address, callback) => {
    const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFzYW4yMiIsImEiOiJjazBta29kZjEwYW56M2l0N2ljMnF2czI4In0.2IfWbxZw3b7TEkp7JZVBqg'
    request({url: mapboxURL, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services', undefined) 
        }else if(response.body.features.length===0){
            callback('Unable to find location', undefined)
        }else{
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: location
            })
        }
    })
}

module.exports = geocode
