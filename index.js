const express = require("express");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const apiKey = "6c9b578e6eb1a3a6444a14eb4b2b261e";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+apiKey;
    https.get(url,function(response){
        // console.log(response.statusCode);
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                // console.log(weatherData);
                // const obj = {
                //     name : "ayush",
                //     age : 19
                // }
                // console.log(JSON.stringify(obj));
                // console.log(weatherData.main.humidity);
                // console.log(weatherData.sys.country);
                // console.log(weatherData.weather[0].description);
                res.write("<h1>temperature at "+query+" is : " + weatherData.main.temp+"</h1>");
                res.write("<h3>humidity at "+query+" is : " + weatherData.main.humidity+"</h3>");
                res.write("<p>weather at "+query+" is : " + weatherData.weather[0].description+"</p>");
                const icon = weatherData.weather[0].icon;
                const iconId = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
                res.write("<img src="+iconId+">");
                res.send();
            })
    })
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

