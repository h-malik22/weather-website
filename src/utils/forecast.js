const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/60223830f91893eb7c66c74140b0eb14/' + lat + ',' + long + '?units=si'
    
    request({url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                celciusTemp : response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            }) 
        }
    })
}

module.exports = forecast