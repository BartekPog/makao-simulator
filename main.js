const Card = require("./card.js");
const Player = require("./player.js");
const initPromise = require("./init.js");

initPromise.then(algorithmNames => {
  console.log(algorithmNames);
});
