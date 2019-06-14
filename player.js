const Card = require("./card.js");

function Player(startingDeck, algorithmName) {
  this.deck = startingDeck;

  this.algorithmName = algorithmName;

  this.requests = {
    skip: 0,
    pull: 0,
    color: -1,
    type: -1
  };

  this.selectCardArray = require("./algorithms/" + algorithmName + ".js");

  this.removeFromDeck = (cardArray) => {
    let removeCount = 0;
    cardArray.forEach((card) => {
      for (let i = 0; i < this.deck.length; i++)
        if (
          (this.deck[i].color === card.color) &&
          (this.deck[i].type === card.type)
        ) {
          this.deck.splice(i, 1);
          removeCount++;
          break;
        }
    });
    return removeCount;
  };

  this.addToDeck = (cardArray) => {
    this.deck.push(...cardArray);
  };

  this.setRequests = (newRequests) => {
    const requestUpdated = {
      skip: newRequests.skip,
      pull: newRequests.pull,
      color: newRequests.color,
      type: neqRequests.type
    };
    this.requests = requestUpdated;
  };

  this.addRequests = (newRequests) => {
    this.setRequests({
      skip: this.requests.skip + newRequests.skip,
      pull: this.requests.pull + newRequests.pull,
      color: newRequests.color,
      type: neqRequests.type
    });
  };

  this.getMatchingCards = (topCard) => {
    const newMatchingDeck = [];
    this.deck.forEach((card) => {
      if (
        (this.isMatching(card, topCard)) ||
        (card.type === 0)
      ) newMatchingDeck.push(card);
    });
    return newMatchingDeck;

    // TEST LATER
    // return this.deck.filter((card)=>{
    //   return this.isMatching(card, topCard);
    // }.bind({topCard:topCard}));

  };

  this.replaceJoker = (cardArray) => {
    return cardArray.map((card) => {
      if (card.type === 0)
        return {
          color: card.cardRequest.color,
          type: card.cardRequest.type,
          cardRequest: {
            color: card.cardRequest.request.color,
            type: card.cardRequest.request.type
          }
        };
      return card;
    });
  };

  this.isColorMatch = (chosenCard, topCard) => {
    if (this.requests.color === -1) {
      if (chosenCard.color === topCard.color)
        return true;
      return false;
    } else {
      if (chosenCard.color === this.requests.color)
        return true;
      return false;
    }
  };

  this.isTypeMatch = (chosenCard, topCard) => {
    if (this.requests.type === -1) {
      if (chosenCard.type === topCard.type)
        return true;
      return false;
    } else {
      if (chosenCard.type === this.requests.type) {
        if ((chosenCard.type === 12) && (chosenCard.color === 3))
          return false;

        if (
          (chosenCard.type === 13) && (
            (chosenCard.color === 1) ||
            (chosenCard.color === 3)
          ))
          return false;

        return true;
      }
      return false;
    }
  };

  this.isMatch = (chosenCard, topCard) => {
    if (this.requests.skip > 0) {
      if (!(
          ((chosenCard.type === 4) && this.isTypeMatch(chosenCard, topCard)) ||
          ((chosenCard.type === 12) && (chosenCard.color === 3))))
        return false;
    }

    if (this.requests.pull > 0) {
      if (!(
          ((chosenCard.type === 12) && (chosenCard.color === 3)) ||
          (
            (
              (this.isColorMatch(chosenCard, topCard)) ||
              (this.isTypeMatch(chosenCard, topCard))
            ) &&
            (
              (chosenCard.type === 2) ||
              (chosenCard.type === 3) ||
              (
                (chosenCard.type === 13) &&
                (
                  (chosenCard.color === 1) ||
                  (chosenCard.color === 3)
                )
              )
            )
          )
        )) return false;
    }
    if (!((this.isColorMatch(chosenCard, topCard)) ||
        (this.isTypeMatch(chosenCard, topCard))))
      return false;

    return true;
  };

  this.isArrayMatch = (cardArray, topCard) => {
    if (cardArray.length <= 0) return true;
    if (this.isMatch(cardArray[0], topCard) == false) return false;

    let removeCount = 0;
    let testDeck = this.deck;
    cardArray.forEach((card) => {
      for (let i = 0; i < testDeck.length; i++)
        if (
          (testDeck[i].color === card.color) &&
          (testDeck[i].type === card.type)
        ) {
          cardArray.splice(i, 1);
          removeCount++;
          break;
        }
    });
    if (removeCount !== cardArray.length)
      return false;

    for (let i = 0; i < cardArray.length - 1; i++) {
      if (this.isTypeMatch(cardArray[i], cardArray[i + 1]) === false)
        return false;
    }
    return true;
  };

  this.getEffect = (cardArray) => {
    let effects = {
      toNext: {
        pullRequest: 0,
        skipRequest: 0,
        typeRequest: -1,
        colorRequest: -1

      },
      toPrev: {
        pullRequest: 0,
      }
    };

    let selfRequests = this.requests;

    cardArray.forEach((card) => {
      if (card.type === 1)
        effects.toNext.colorRequest = card.cardRequest.color;

      else if (
        (card.type === 11) && (
          deck.filter((deckCard) => deckCard.type === card.cardRequest.type).length > 0
        ) && (
          [5, 6, 7, 8, 9, 10, 12, 13].filter((possibleCardType) => possibleCardType === card.cardRequest.type).length > 0
        ))
        effects.toNext.typeRequest = card.cardRequest.type;

      else if (card.type === 4)
        effects.toNext.skipRequest += 1 + selfRequests.skip;

      else if (card.type === 2)
        effects.toNext.pullRequest += 2 + selfRequests.pull;

      else if (card.type === 3)
        effects.toNext.pullRequest += 3 + selfRequests.pull;

      else if ((card.type === 13) && (card.color === 1))
        effects.toNext.pullRequest += 5 + selfRequests.pull;

      else if ((card.type === 13) && (card.color === 3))
        effects.toPrev.pullRequest += 5 + selfRequests.pull;

      selfRequests.skip = 0;
      selfRequests.pull = 0;
    });

    return {
      toNext: effects.toNext,
      toPrev: effects.toPrev,
      self: selfRequests
    };
  };

  this.makeMove = (topCard, players, cardStack) => {

    //this.addRequests(newRequests);

    let matchingCards = this.getMatchingCards(topCard);

    let chosenArray = [];

    if (matchingCards.length > 0) {
      chosenArray = this.selectCardArray(deck, matchingCards, topCard, players);
      if (this.isArrayMatch(chosenArray, topCard) === false)
        chosenArray = [];
    }
    return chosenArray;

  };

}
module.exports = Player;
