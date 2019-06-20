const game = require("./game.js");
const inputInitPromise = require("./input-init.js");

const _cliProgress = require("cli-progress");

const gamesNumber = 100000;

inputInitPromise.then(algorithmNames => {
  let wins = algorithmNames.map(() => 0);
  const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
  progressBar.start(gamesNumber, 0);

  // console.log(wins);

  for (let i = 1; i <= gamesNumber; i++) {
    winner = game([...algorithmNames]);
    progressBar.increment(1);

    if (winner >= 0) {
      wins[winner]++;
      //console.log(i+" of "+gamesNumber+": "+algorithmNames[winner]);
    } //else
      //console.log("game " + i + " terminated");

  }

  progressBar.stop();

  console.log();
  for (let i = 0; i < algorithmNames.length; i++)
    console.log(algorithmNames[i] + ": " + wins[i] + " wins");
});
