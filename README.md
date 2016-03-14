# geocoder

The geocoder will take a CSV file from standard in and will assume it contains 2 fields per line:

1. ID - Unique string representation of the key of the address
2. Address - E.g.: "Cannenburch 110, Lelystad"

The output csv will contain the same 2 fields, but an additional pair of fields will be added, containing Latutude and Longitude according to Google.

3. Formatted Address
4. Longitude
5. Latitude
6. Google Place Id
7. Confidence
8. Street Name
9. Street Number
10. City
11. Country
12. Country Code
13. ZIP code
14. Administrative Levels 1, long
15. Administrative Levels 1, short
16. Administrative Levels 2, short
17. Administrative Levels 2, short
18. Administrative Levels 3, short
19. Administrative Levels 3, short
20. Administrative Levels 4, short
21. Administrative Levels 4, short
22. Administrative Levels 5, short
23. Administrative Levels 5, short

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
