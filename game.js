const Card = require("./card.js");
const Player = require("./player.js");
const Deck = require("./deck.js");


module.exports = (algorithmNames) => {

  const deck = new Deck();
  deck.shuffle();

  const players = [];

  algorithmNames.forEach((algorithmName) => {
    players.push(new Player(deck.take(5), algorithmName));
  });

  let currentPlayerID, nextPlayerID, prevPlayerID, skipped;
  let topCard = deck.firstCard();
  let playersMoves = [];

  for (let i = 0 + algorithmNames.length; i < 1000 + algorithmNames.length; i++) {
    currentPlayerID = i % players.length;
    nextPlayerID = (i + 1) % players.length;
    prevPlayerID = (i - 1) % players.length;
    //skipped=false;

    deck.shuffleIn(players[currentPlayerID].lastCards);

    // console.log(players[currentPlayerID].deck.length);


    let playerMove = players[currentPlayerID].makeMove({
      selfID: currentPlayerID,
      topCard: topCard,
      playersMoves: [...playersMoves],
      playersNumber: algorithmNames.length
    });

    playersMoves.push(playerMove);


    if (playerMove.moveCards.length === 0) {
      if (playerMove.ownRequests.skip > 0) {
        players[currentPlayerID].reduceSkip(1);

        playerMove.effects.toNext.pull += playerMove.ownRequests.pull;
        players[currentPlayerID].reducePull(playerMove.ownRequests.pull);
      } else {
        players[currentPlayerID].addToDeck(deck.take(1),1);

        playerMove = players[currentPlayerID].makeMove({
          selfID: currentPlayerID,
          topCard: topCard,
          playersMoves: [...playersMoves],
          playersNumber: algorithmNames.length
        });
        playersMoves.push(playerMove);
      }
    } else {
      topCard = playerMove.moveCards[playerMove.moveCards.length - 1];
    }

    players[currentPlayerID].addToDeck(deck.take(players[currentPlayerID].requests.pull),players[currentPlayerID].requests.pull);

    players[nextPlayerID].addRequests(playerMove.effects.toNext);
    players[prevPlayerID].addRequests(playerMove.effects.toPrev);


    if (players[currentPlayerID].isWinner()){
      // console.log(i-algorithmNames.length);
      return currentPlayerID;
    }

  }
  players.forEach(player => console.log(player.deck));

  return -1;
};
