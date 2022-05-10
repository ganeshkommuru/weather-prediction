const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2FuZXNoa29tbXVydSIsImEiOiJjbDJqd3E2ZWIwdmwzM2ZvN2xzdmMwbnNqIn0.bqhgvjIYThBL9_Mcm0ZsCw&limit=1';
    request({url:url,json: true},(error,response) => {
        if(error){
            callback('unable to fetch the response',undefined)
        }else if(response.body.features.length == 0){
            callback('no features exist for the given location',undefined)
        }else {
            const data = response.body.features[0]
            callback('',{latitude: data.center[1], longitude: data.center[0], location: data.place_name})
        }
    })
}

module.exports = geocode