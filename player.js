const Card = require("./card.js");

function Player(startingDeck, algorithmName) {
  this.deck = startingDeck;

  this.requests = {
    skip: 0,
    pull: 0,
    color: -1,
    type: -1
  }

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

  this.replaceJoker = (cardArray) => {
    return cardArray.map((card) => {
      if (card.type === 0)
        return {
          color: card.cardRequest.color,
          type: card.cardRequest.type,
          cardRequest: {
            color: -1,
            type: -1
          }
        };
      return card;
    });
  };

  this.getMatchingCards = (topCard) => {
    const newMatchingDeck = [];
    this.deck.forEach((card) => {
      if (this.isMatching(card, topCard))
        newMatchingDeck.push(card);
    });
    return newMatchingDeck;

    // TEST LATER
    // return this.deck.filter((card)=>{
    //   return this.isMatching(card, topCard);
    // }.bind({topCard:topCard}));

  };

  this.selectCard = require("./algorithms/" + algorithmName + ".js");

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
      if (chosenCard.type === this.requests.type)
        return true;
      return false;
    }
  };

  this.isMatch = (chosenCard, topCard) => {
    if (this.requests.skip > 0) {
      if !(
        ((chosenCard.type === 4) && this.isTypeMatch(chosenCard, topCard)) ||
        ((chosenCard.type === 12) && (chosenCard.color === 3)))
      return false;
    }

    if (this.requests.pull > 0) {
      if !(
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
      ) return false;
    }
    if !((this.isColorMatch(chosenCard, topCard)) ||
      (this.isTypeMatch(chosenCard, topCard)))
    return false;

    return true;
  };

  this.isArrayMatch = (cardArray, topCard) => {
    if (cardArray.length <= 0) return false;
    if (this.isMatch(cardArray[0], topCard) == false) return false;

    for (let i = 0; i < cardArray.length - 1; i++) {
      if (this.isTypeMatch(cardArray[i], cardArray[i + 1]) === false)
        return false;
    }
    return true;
  };


  /////////not done yet
  this.getEffect = (cardArray) => {
    let effects = {
      toNext: {
        pullRequest: 0,
        skipRequest: 0
      },
      toPrev: {
        pullRequest: 0,
        skipRequest: 0
      }
    };

    let selfRequests = this.requests;

    cardArray.forEach((card) => {
      if (selfRequests.skip)
    });
  };


};

module.exports = Player;
