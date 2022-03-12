const request = require('request')
const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHJpdGhpazEtMi0zIiwiYSI6ImNrenp4ZHo3ODA3ZjkzY21lZms0MzNuc2YifQ.y0OZabwOm_zYz7c9xeqz3g'
 
    request({url : url, json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service',undefined)
        }else if (response.body.features.length === 0){
            callback('unable to find location try another',undefined)
        }else{
             callback(undefined,{
              latitude :response.body.features[0].center[1],
              longitude : response.body.features[0].center[0],
              location :response.body.features[0].place_name
             })
        }
    })
}
module.exports = geoCode
