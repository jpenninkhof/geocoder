var apiKey = "AIzaSyAj9GGrBLnNPImKnl7MKAuD737t1MHnMT8";
var geocoder = require('node-geocoder') ("google", "https", { apiKey: apiKey });
var csv = require('csv');

process.stdin
	.pipe(csv.parse())
	.pipe(csv.transform(function(data, callback){
		setImmediate(function(){
			geocoder.geocode(data[1])
			    .then(function(res) {
					data.push(res.length === 0 ? "" : res[0].formattedAddress);
					data.push(res.length === 0 ? 0 : res[0].longitude);
					data.push(res.length === 0 ? 0 : res[0].latitude);
					data.push(res.length === 0 ? "" : res[0].extra.googlePlaceId);
					data.push(res.length === 0 ? 0 : res[0].extra.confidence);
					data.push(res.length === 0 ? "" : res[0].streetName);
					data.push(res.length === 0 ? "" : res[0].streetNumber);
					data.push(res.length === 0 ? "" : res[0].city);
					data.push(res.length === 0 ? "" : res[0].country);
					data.push(res.length === 0 ? "" : res[0].countryCode);
					data.push(res.length === 0 ? "" : res[0].zipcode);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level1long);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level1short);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level2long);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level2short);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level3long);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level3short);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level4long);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level4short);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level5long);
					data.push(res.length === 0 ? "" : res[0].administrativeLevels.level5short);
					callback(null, data);
			    })
			    .catch(function(err) {
			        data.push("ERROR: " + err.message);
					callback(null, data);
			    });
			});
		}, {parallel: 5}))
	.pipe(csv.stringify({quotedString: true}))
	.pipe(process.stdout);
