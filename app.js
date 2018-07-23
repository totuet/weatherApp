var request = require('request');
var fs = require('fs');
var argv = require('yargs')
    .usage('Usage: $0 -c [city]')
    .argv;

var citydata;
var city = argv.c;
console.log(city);

var APIKEY = '850e1864888c097f32d7b49873fceadb'



var lookupID = fs.readFile('./city.list.json', (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    for (i = 0; i < data.length; i++) {
        if (data[i]["name"] === city) {
            citydata = data[i];
        }
    }


    var Address = `http://api.openweathermap.org/data/2.5/weather?id=${citydata.id}&APPID=${APIKEY}`;
    

    request(Address, (err, response, body) => {
        if (err) { return console.log(err); }
        var body = JSON.parse(body);

        console.log(`De temperatuur in ${city} bedraagt ${Math.round(body.main.temp-273.15)}°C`);

        var wind = body.wind.deg;
        if ( wind > 280 && wind < 350) {
            console.log("Noordwesten wind");
        } else if (wind > 190 && wind < 260) {
            console.log("Zuidwesten wind");
        } else if (wind > 100 && wind < 170) {
            console.log("Zuidoosten wind");
        } else if (wind > 10 && wind < 80) {
            console.log("Noordoosten wind");
        } else if (wind >= 80 && wind <= 100) {
            console.log("Ooster wind");
        } else if (wind >= 170 && wind <= 190) {
            console.log("Zuider wind");
        } else if (wind >= 260 && wind <= 280) {
            console.log("Westen wind");
        } else {
            console.log("Noorder wind");
        };
    })

});













/*
{ id: 2793446,
  name: 'Lanaken',
  country: 'BE',
  coord: { lon: 5.6468, lat: 50.893181 } }
*/
