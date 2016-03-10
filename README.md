# geocoder

The geocoder will take a CSV file from standard in and will assume it contains 2 fields per line:

1. ID - Unique string representation of the key of the address
2. Address - E.g.: "Cannenburch 110, Lelystad"

The output csv will contain the same 2 fields, but an additional pair of fields will be added, containing Latutude and Longitude according to Google.

3. Longitude
4. Latutude

## Installation

install node.js from https://nodejs.org/

install a git client from e.g. https://git-scm.com/downloads

`git clone https://github.com/jpenninkhof/geocoder.git`

`cd geocoder`

`npm install`

replace the API key with an actual API key in geocoder.js

## Usage

`node geocoder.js < input.csv > output.csv`

A sample input.csv is provided
