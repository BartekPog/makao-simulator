const Card = require("./card.js");

function Deck() {
  this.deck = [];

  this.init = () => {
    let deck = [];

    for (let color = 1; color <= 4; color++)
      for (let type = 1; type <= 13; type++) {
        deck.push(new Card(color, type, {
          color: -1,
          type: -1
        }));
      }

    deck.push(new Card(0, 0, {
      color: -1,
      type: -1
    }));

    deck.push(new Card(0, 0, {
      color: -1,
      type: -1
    }));

    this.deck = deck;
  };

  this.shuffle = () => {
    let deck = this.deck;
    for (let i = 0; i < deck.length; i++) {
      const index = Math.floor(Math.random() * deck.length);

      const buff = deck[i];
      deck[i] = deck[index];
      deck[index] = deck[i];
    }
    this.deck = deck;
  };

  this.takeCard = () => {
    return this.deck.pop();
  };

  this.shuffleInArray = (cardArray) => {
    let deck = this.deck;

    cardArray.forEach(card =>
      deck.splice(Math.floor(Math.random() * deck.length), 0, card));

    this.deck = deck;
  };

}


module.exports = Deck;
