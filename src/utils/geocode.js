const request = require('request');

/**
 * dynamic functionality callback abstraction 
 */

 const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVoYW1tYWR1c2FtYWJ1dHQiLCJhIjoiY2w5d2hyc3p0MDB1NTN1cXI2d3kwMzQ0MyJ9._Ozc7NbggY-abzz8uJUrQQ';
    request({ url: url, json: true }, (error,response) => {
        if (error) {
            callback("Unable to connect to location service!",undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find the location.Try another search", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });

 }
module.exports = geocode;