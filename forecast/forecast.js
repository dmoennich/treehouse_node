var http = require("http");
var printer = require("./printer");
var appId = "492ff5c71fc594b5c487a3ccc57a73fb";
var openWeatherEndpoint = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={app-id}";

var get = function(longitude, latitude, callbackFunc) {
	var reqUrl = openWeatherEndpoint.replace("{lat}", latitude).replace("{lon}", longitude).replace("{app-id}", appId);
	var req = http.get(reqUrl, function(res){
		var httpError;
		if(res.statusCode === 200){
			var forecastJson = "";
			res.on("data", function(dataChunk){
				forecastJson += dataChunk;
			});
			res.on("end", function(){
				try{
					var forecast = JSON.parse(forecastJson);
					callbackFunc(forecast);
				}catch(jsonError){
					printer.printError(jsonError);
				}
			});
		}else {
			httpError = "Status code error " + res.statusCode + " " +
				http.STATUS_CODES[res.statusCode] + " for request " + reqUrl;
			printer.printError({message: httpError});
		}
	});
	req.on("error", printer.printError);
};

module.exports.get = get;






