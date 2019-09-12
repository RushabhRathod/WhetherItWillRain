/*jshint esversion: 8*/
const request = require("request");

const getWeather = async (lat, long) => {
    return new Promise((resolve, reject) => {
        if(!(Number.isFinite(lat) && Number.isFinite(long))) {
            return reject(new Error("Invalid coordinated") );
        }
        const weatherURL =  setURL(lat, long);
        if(weatherURL){
            request({url: weatherURL, json: true}, (err, {body} = {}) => {
                if(err) {
                    return reject(new Error(err));
                }else if(body.error || body.code){
                    return reject(new Error("Error: " + body.error));
                }else {
                    console.log("The current temp is : " + body.currently.temperature + " and there is " + body.currently.precipProbability*100 + "% chances of rain");
                    return resolve({
                        temperature: body.currently.temperature,
                        precipProbability: body.currently.precipProbability*100
                    });
                }
            });
        }
    });
};

const setURL = (lat, long) => {
    return "https://api.darksky.net/forecast/638b7e73c82c06fb393a3e3534408ec2/" + lat + "," + long + "?units=si";
};

module.exports = getWeather;