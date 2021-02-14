const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=705a716d7fcf89b9f975e65af8916530&query=${latitude},${longitude}`

    request({ url, json: true}, (error,{ body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const rain = body.current.precip
            const message = `The temperature is ${temp} degrees, but feels like ${feelslike} degrees. The chance of rain is ${rain}% .`

            callback(undefined, message)
        }
    })
}

module.exports = forecast