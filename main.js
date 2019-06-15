const game = require("./game.js");
const inputInitPromise = require("./input-init.js");

const gamesNumber = 100;

inputInitPromise.then(algorithmNames => {
  let wins = algorithmNames.map(() => 0);
  // console.log(wins);

  for (let i = 0; i < gamesNumber; i++) {
    winner = game(algorithmNames);
    if (winner >= 0) {
      wins[winner]++;
      console.log(i+" of "+gamesNumber+": "+algorithmNames[winner]);
    } else
      console.log("game " + i + " terminated");

  }

  for (let i = 0; i < algorithmNames.length; i++)
    console.log(algorithmNames[i] + ": " + wins[i] + " wins");
});
