var http = require("http");

var userName = "dmoennich";

var printMessage = function(userName, badgeCount, jsPoints){
	console.log("The user " + userName + " has " + badgeCount + " badges and " + jsPoints + " JavaScript points.");
};


var printErrorMessage = function(error){
	console.error("An error occured: " + error.message);
};


var req = http.get("http://teamtreehouse.com/" + userName + ".json", function(res){
	var resBody = "",
	statusCodeError;

	if(res.statusCode === 200){
		res.on("data", function(dataChunk){
			resBody += dataChunk;
		});

		res.on("end", function(){
			try{
				var resJson = JSON.parse(resBody);
				printMessage(userName, resJson.badges.length, resJson.points.JavaScript);
			}catch(jsonError){
				printErrorMessage(jsonError);
			}
		});
	}else {
		statusCodeError = {
			message: "Status code " + res.statusCode +
				" (" + http.STATUS_CODES[res.statusCode] + ") returned for user " + userName + "."
		};
		printErrorMessage(statusCodeError);
	}
});


req.on("error", printErrorMessage);


