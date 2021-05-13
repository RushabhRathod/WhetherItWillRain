/*jshint esversion: 8*/
console.clear();
const path = require("path");
const express = require("express"); 
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const getCoordinates = require("./utils/getCoordinates");
const getWeather = require("./utils/getWeather");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Application",
        name: "Rushabh and Parthiv"
    });
});

app.get("/weather", async (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }

    let coord = await getCoordinates(req.query.address)
        .catch(er => {
            return {
                error: er.message
            };
        });

    if(coord.error){
        return res.send({
            error: coord.error
        });
    }

    let forecast = await getWeather(coord.lat, coord.long)
        .catch(er => {
            console.log("Weather error");
            return {
                error: er.message
            };
        });
    
    if(forecast.error) {
        console.log("Error in feathing weather info");
        return res.send({
            error: forecast.error
        });
    }
    return res.send(forecast);//redirect("/about");
        
});

app.get("/product", (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    res.send({
        products: []
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Rusahbh and Parthiv"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This is the help page",
        name: "Rushabh and Parthiv"
    });
});

app.use("/help/*", (req, res)=> {
    res.status(404).render("404", {
        title: "Error 404",
        message: "Help article not found"
    });
});

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Error 404",
        message: "not found"
    });
});
// app.get("*", (req, res) => {
//     res.status(404).send("404");
// });

app.listen(port, () => {
    console.log("Server is lisiting at port " + port + ".");
    //http://localhost:3000
});
