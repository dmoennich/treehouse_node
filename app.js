var http = require("http");

var req = http.get("http://teamtreehouse.com/dmoennich.json", function(res){
	console.log(res.statusCode);
});


req.on("error", function(error){
	console.error("An error occured retrieving the user data: " + error.message);
});