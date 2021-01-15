
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const units = "metric";
  const appid = "appid";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=" + units;
  https.get(url, function(response){
    response.on("data", function(data){

      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description

      const icon = weatherData.weather[0].icon
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const location = weatherData.name

      res.write("<p>The Weather is Currently: " + description + "</p>")
      res.write("<h1>The Temperatur in "+ query + " is " + temp + " degree Celcious</h1>")
      res.write("<img src=" + iconUrl + ">")
      res.send();
    });
    // res.send("server started "+ weatherData);

  });
});




app.listen(3000, function(){
  console.log("server started on port 3000");
});
