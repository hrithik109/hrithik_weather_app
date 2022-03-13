const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=912bf0afb17924bbf516208fde002c80&query='+latitude+ ',' + longitude + '&units=m'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to network!',undefined)
        }else if(response.body.error){
            console.log('unable to get weather info',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degree out. It feels like " + response.body.current.feelslike + " degree out. The humidity is " + response.body.current.humidity+ "%.")
            
        }
    })
}
module.exports = forecast