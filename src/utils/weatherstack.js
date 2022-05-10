const request = require('request')

const weatherstack = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4dbfb8d5f4fa55b96342c2809130d38&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to fetch the response!',undefined)
        }else if(response.body.error){
            callback('unable to access the specified location',undefined)
        }else {
            const data = response.body.current
            callback('',{temperature: data.temperature, feelslike: data.feelslike})
        }
    })
}

module.exports = weatherstack