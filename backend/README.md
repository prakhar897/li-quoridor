API Documentation

Data Format, each Game:

{
"white": { // details of the white-piece player:
"username": "string", // the username
"rating": 1492, // the player's rating after the game finished
"result": "string", // see "Game results codes" section
},
"black": { // details of the black-piece player:
"username": "string", // the username
"rating": 1942, // the player's rating after the game finished
"result": "string", // see "Game results codes" section
}
"url": "string", // URL of this gamexx
"pgn": "string", // final PGN
"start_time": 1254438881, // timestamp of the game start (Daily Chess only)
"end_time": 1254670734, // timestamp of the game end
"type": "Normal" //Normal , 4 player etc
last_activity
}
