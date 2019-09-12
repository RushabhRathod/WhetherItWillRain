/*jshint esversion: 8*/
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecat = document.querySelector("#forecast");
const json = document.querySelector("#json");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    forecast.textContent = "LOADING!!!!";
    const location = search.value;
    fetch("/weather?address="+ location).then((response) => {
    console.log("response");
    console.log(response);
    response.json().then((data) => {    
        if(data.error) {
            forecast.textContent = data.error;
        }else{
            forecast.innerHTML = 
             "There is " + data.precipProbability + "% chance of raining.<br>"  + 
             "Right now, it is " + data.currentSummary + ".<br>" +
             "There will be " + data.hourlySummary + ".<br>"  +
             "For entire week, it might " + data.dailySummary + ".";
            
            //json.textContent = JSON.stringify(data.body,null, "\t");
        }
    });
});
});