var apiKey = "<APIKEY>";
var batchSize = 100;

var geocoder = require('node-geocoder') ("google", "https", { apiKey: apiKey });
var csv = require('csv');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var bundle = [];
rl.on('line', function(line) {
    csv.parse(line, function(err, data) {
		bundle.push(data[0]);
		if (bundle.length >= batchSize) {
			processBundle(bundle);
			bundle = [];
		}
	})
});
rl.on('close', function() {
	processBundle(bundle);
});

function processBundle(bundle) {
	var batch = [];
	for (var i = 0; i < bundle.length; i++) {
		batch.push(bundle[i][1]);
	}
	geocoder.batchGeocode(batch, function (err, result) {
		if (!err) {
			processResults(bundle, result);
		}
	});
}

function processResults(bundle, result) {
	for (var i = 0; i < result.length; i++) {
		var value = result[i].value[0];
		bundle[i].push(result[i].value.length === 0 ? 0 : value.formattedAddress);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.longitude);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.latitude);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.extra.googlePlaceId);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.extra.confidence);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.streetName);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.streetNumber);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.city);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.country);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.countryCode);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.zipcode);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.administrativeLevels.level1long);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.administrativeLevels.level1short);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.administrativeLevels.level2long);
		bundle[i].push(result[i].value.length === 0 ? 0 : value.administrativeLevels.level2short);
	}
	csv.stringify(bundle, {quotedString: true}, writeOutput);
}

function writeOutput(err, output) {
	process.stdout.write(output);
}
