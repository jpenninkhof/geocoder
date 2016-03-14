var apiKey = "AIzaSyAj9GGrBLnNPImKnl7MKAuD737t1MHnMT8";
var geocoder = require('node-geocoder') ("google", "https", { apiKey: apiKey });
var csv = require('csv');

process.stdin
	.pipe(csv.parse())
	.pipe(csv.transform(function(data, callback){
		setImmediate(function(){
			geocoder.geocode(data[1])
		    .then(function(res) {
				if (res.length === 0) {
					data.push(0);
					data.push(0);
				} else {
					data.push(res[0].latitude);
					data.push(res[0].longitude);
				}
				callback(null, data);
		    })
		    .catch(function(err) {
		        console.log(data[0] + " " + err);
		    });
		});}, {parallel: 1}))
	.pipe(csv.stringify({quotedString: true}))
	.pipe(process.stdout);
