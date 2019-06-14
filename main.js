const Card = require("./card.js");
const Player = require("./player.js");
const inputInitPromise = require("./input-init.js");
const deckInit = require("./deck-init.js");

let deck=deckInit();

inputInitPromise.then(algorithmNames => {

});
