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
                    return resolve({
                        currentSummary: body.currently.summary,
                        hourlySummary: body.hourly.summary,
                        dailySummary: body.daily.summary,
                        temperature: body.currently.temperature,
                        precipProbability: Math.round( body.currently.precipProbability*100)
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