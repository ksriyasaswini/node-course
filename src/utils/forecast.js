const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=34aea5463b62de8451dcdc6ad939b244&query=' + lat + ',' + long + '&units=f'
    request({url, json: true}, (error, {body}) => {
        //console.log(response.body.current)
        if(error) {
            callback('Unable to connect to weather Service!!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(response.body.current.weather_descriptions[0])
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            callback(undefined, 'It is currently ' + body.current.temperature + ' outside and feels like ' + body.current.feelslike + ' outside. The humidity is ' + body.current.humidity + '%.' )
        }
        })
}
module.exports = forecast