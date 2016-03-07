var apiKey = "<YOUR-KEY>";
var geocoder = require('node-geocoder') ("google", "https", { apiKey: apiKey });
var csv = require('csv');

process.stdin
	.pipe(csv.parse())
	.pipe(csv.transform(function(data, callback){
		setImmediate(function(){
			geocoder.geocode(data[1])
		    .then(function(res) {
				data.push(res[0].latitude);
				data.push(res[0].longitude);
				callback(null, data);
		    })
		    .catch(function(err) {
		        console.log(data[0] + " " + err);
		    });
		});}, {parallel: 20}))
	.pipe(csv.stringify({quotedString: true}))
	.pipe(process.stdout);
