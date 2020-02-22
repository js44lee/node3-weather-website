const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8d77d4517691e5795cefab828b2a924c/' + latitude + ',' + longitude
    
    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.currently.temperature
            const chance = body.currently.precipProbability   
    
            console.log(body.daily.data[0])
            callback(undefined, 
                body.daily.data[0].summary + ` It is currently ${temperature} degrees out. There is a ${chance}\% chance of rain.\n` + 
                'The high today is ' + body.daily.data[0].temperatureHigh + 
                ' with a low of ' + body.daily.data[0].temperatureLow + '.')
        }
    })
}

module.exports = forecast