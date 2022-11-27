const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {

const apiKey = "faa840ecf9d6121225edda3b8013f976";
const city = req.body.cityName;
const units = "imperial"
const url = "xxxxxxxxx"+ city + "&appid=" + apiKey + "&units=" + units;

https.get(url, (function(response) {
    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const iconPath = weatherData.weather[0].icon
        const iconURL = "http://openweathermap.org/img/wn/" + iconPath + ".png"
        res.write("<p>The weather is " + description + "</p>");
        res.write("<h1>The temperature for " + city + " is " + temp + " </h1>")
        res.write("<img src = " + iconURL + ">")
        res.send();
    });
}));

});


app.listen(3000, function() {
    console.log("Server is running on port 3000 brah...")
})