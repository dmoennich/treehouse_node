var http = require("http");

var userName = "dmoennich";

var printMessage = function(userName, badgeCount, jsPoints){
	console.log("The user " + userName + " has " + badgeCount + " badges and " + jsPoints + " JavaScript points.");
};


var req = http.get("http://teamtreehouse.com/dmoennich.json", function(res){
	var resBody = "";

	res.on("data", function(dataChunk){
		resBody += dataChunk;
	});

	res.on("end", function(){
		var resJson = JSON.parse(resBody);
		printMessage(userName, resJson.badges.length, resJson.points.JavaScript);
	});
});


req.on("error", function(error){
	console.error("An error occured retrieving the user data: " + error.message);
});


