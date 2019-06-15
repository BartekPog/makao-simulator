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

  for (let i = 0 + algorithmNames.length; i < 100000 + algorithmNames.length; i++) {
    currentPlayerID = i % players.length;
    nextPlayerID = (i+1) % players.length;
    prevPlayerID = (i-1) % player.length;
    skipped=false;


    let playerMove = players[currentPlayerID].makeMove({
      selfID: currentPlayerID,
      topCard: topCard,
      playersMoves: playersMoves,
      playersNumber: algorithmNames.length
    });

    playersMoves.push(playerMove);

    if(playerMove.moveCards.length===0){
      if(playerMove.ownRequests.skip>0){
        players[currentPlayerID].reduceSkip(1);
        skipped=true;
        playerMove.effects.toNext.pull += playerMove.ownRequests.pull;
        player[currentPlayerID].reducePull(playerMove.ownRequests.pull);
      }else {
        players[currentPlayerID].addToDeck(deck.take[1]);
        players[currentPlayerID].reducePull(1);

        playerMove = players[currentPlayerID].makeMove({
          selfID: currentPlayerID,
          topCard: topCard,
          playersMoves: playersMoves,
          playersNumber: algorithmNames.length
        });
        playersMoves.push(playerMove);
      }
    }

    players[currentPlayerID].addToDeck(deck.take(players[currentPlayerID.requests.pull]));
    
    players[nextPlayerID].addRequests(playerMove.effects.toNext);
    players[prevPlayerID].addRequests(playerMove.effects.toPrev);

    if (players[currentPlayer].isWinner())
      return currentPlayer;
  }

};
