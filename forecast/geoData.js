var http = require("http");
var printer = require("./printer");
var geoCodingEndpoint = "http://maps.googleapis.com/maps/api/geocode/json?address=";

var get = function(address, callbackFunc) {
	var req = http.get(geoCodingEndpoint + address, function(res){
		var httpError;
		if(res.statusCode === 200){
			
			var geoDataJson = "";
			res.on("data", function(dataChunk){
				geoDataJson += dataChunk;
			});
			res.on("end", function(){
				try{
					var geoData = JSON.parse(geoDataJson);
					var lng = geoData.results[0].geometry.location.lng;
					var lat = geoData.results[0].geometry.location.lat;
					callbackFunc(lng, lat);
				}catch(jsonError){
					printer.printError(jsonError);
				}
			});
		}else {
			httpError = "Status code error " + res.statusCode + " " +
				http.STATUS_CODES[res.statusCode] + " for location " + address;
			printer.printError({message: httpError});
		}
	});
	req.on("error", printer.printError);
};

module.exports.get = get;






