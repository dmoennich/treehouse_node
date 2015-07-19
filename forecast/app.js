
var geoData = require("./geoData");
var forecast = require("./forecast");
var printer = require("./printer");
var address = process.argv[2];

geoData.get(address, function(lng, lat){
	forecast.get(lng, lat, function(forecast){
		printer.printForecast(forecast);
	});
});





