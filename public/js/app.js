/*jshint esversion: 8*/
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecat = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    forecast.textContent = "LOADING!!!!";
    const location = search.value;
    fetch("http://localhost:3000/weather?address="+ location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            forecast.textContent = data.error;
        }else{
            forecast.textContent = "The temprature is " + data.temperature + " and there is " + data.precipProbability + "% chance of raining.";
        }
    });
});
});