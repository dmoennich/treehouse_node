
var printError = function(error){
	console.error("An error occured: " + error.message);
};

var printForecast = function(forecast){
	var zeroCelsiusInKelvin = 273.15;
	var temp = Math.round((forecast.main.temp - zeroCelsiusInKelvin) * 10) / 10;
	var hum = forecast.main.humidity;
	var location = forecast.name;
	console.log("Current in " + location + ": " + temp + "°C, " + hum + "%");
};

module .exports.printError = printError;
module.exports.printForecast = printForecast;