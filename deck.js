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

  this.take = (howMany) => {
    const arr = [];
    const deck = this.deck;
    for (let i = 0;
      ((i < howMany) && (deck.length > 0)); i++)
      arr.push(deck.pop());
    this.deck = deck;
    return arr;
  };

  this.shuffleIn = (cardArray) => {
    let deck = this.deck;

    cardArray.forEach(card =>
      deck.splice(Math.floor(Math.random() * deck.length), 0, card));

    this.deck = deck;
  };

  this.firstCard = () => {
    let card = this.take(1)[0];

    while (
      ([0,1,2,3,4,11].indexOf(card.type>=0)) || (
        ((card.type===12) && (card.color===3)) || (
          (card.type===13) && (
          (card.color===1) || (card.color===3)
          )
        )
      )
    ){
      this.shuffleIn([card]);
      card = this.take(1)[0];
    }
    return card;
  };

  ///////////////////////////////////
  this.init();
}


module.exports = Deck;
