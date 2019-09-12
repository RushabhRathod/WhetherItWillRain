/*jshint esversion: 8*/
const request = require("request");

const getCoordinates = async (address) => {
    return new Promise((resolve, reject) =>{
        const locationURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicnVzaGFiaHJhdGhvZCIsImEiOiJjazA0cnpsaWExYmR4M2ZwNGZ0cTI1cGtrIn0.mqyYEkD3pYAUbkfk5D7O5Q&limit=1";
        request({url: locationURL, json: true},  (err, {body} = {}) => {
            if(err) {
                return reject(new Error("Error in getting location data"));
            }else if(body.features.length === 0) {
                return reject(new Error("Error: INVALID PLACE "+ body.query[0]));
            }else if(body) {
                return resolve({
                    long: body.features[0].center[0],
                    lat: body.features[0].center[1]
                });
            }else {
                return reject(new Error("No error but res is undefined"));
            }
        });
    });
};

module.exports = getCoordinates;