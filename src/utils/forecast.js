const request = require('request');

const forecast = (latitiude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4613ecd7944c19307c1cd533641428f&query='+latitiude+','+longitude+'&units=m';
    request({ url: url, json: true }, (error,response) => {
        if (error) {
            callback("Unable to connect to weather service!",undefined);
        } else if (response.body.error) {
            callback("Unable to find the location.Try another search", undefined);
        } else {
            callback(undefined,response.body.current.weather_descriptions[0]+".Current Temprature is "+response.body.current.temperature + " "+"and Precip is "+response.body.current.precip+". The humidity is "+response.body.current.humidity+" %");
        }
    });

 }
module.exports = forecast;