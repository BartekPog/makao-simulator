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

  this.lastCards = [];

  this.selectCardArray = require("./algorithms/" + algorithmName + "-alg.js");

  this.isWinner = () => {
    return this.deck.length === 0;
  };

  this.removeFromDeck = (cardArray) => {
    let removeCount = 0;
    let deck=[...this.deck];

    cardArray.forEach((card) => {
      for (let i = 0; i < deck.length; i++)
        if (
          (deck[i].color === card.color) &&
          (deck[i].type === card.type)
        ) {
          deck.splice(i, 1);
          removeCount++;
          //console.log(card);
          break;
        }
    });
    // console.log(this.deck.length-deck.length-cardArray.length!=0);
    if(removeCount>cardArray.length)
      console.log("za duzo");
    if(removeCount<cardArray.length){
      console.log();
      console.log("za malo");
      console.log(this.deck);
      console.log(deck);
      console.log(cardArray);
      console.log(removeCount);
      console.log(this.isInDeck(cardArray));
      console.log();
    }

    // console.log(removeCount>cardArray.length);
    // console.log();
    this.deck=[...deck];
    return removeCount;
  };

  this.addToDeck = (cardArray, howMany) => {
    this.reducePull(cardArray.length);
    this.deck = this.deck.concat(cardArray);
  };

  this.setRequests = (newRequests) => {
    this.requests = {
      skip: newRequests.skip,
      pull: newRequests.pull,
      color: newRequests.color,
      type: newRequests.type
    };
  };

  this.addRequests = (newRequests) => {
    this.setRequests({
      skip: this.requests.skip + (newRequests.skip || 0),
      pull: this.requests.pull + (newRequests.pull || 0),
      color: newRequests.color || this.requests.color,
      type: newRequests.type || this.requests.type
    });
  };

  this.reduceSkip = (howMany) => this.requests.skip = Math.max(this.requests.skip-howMany, 0);

  this.reducePull = (howMany) => this.requests.pull = Math.max(this.requests.pull-howMany, 0);

  this.isActiveRequest = () => {
    if (this.requests.skip + this.requests.pull > 0)
      return true;
    return false;
  };

  this.replaceJoker = (cardArray) => {
    return cardArray.map((card) => {
      if (card.type === 0){
        if((card.cardRequest.type === 0) || (card.cardRequest.color=== 0))
          console.log("Wrong joker assign");
        return {
          color: card.cardRequest.color,
          type: card.cardRequest.type,
          cardRequest: {
            color: card.cardRequest.cardRequest.color,
            type: card.cardRequest.cardRequest.type
          }
        };
      }
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
    if (this.isActiveRequest()){
      if((chosenCard.type === 12) && (chosenCard.color === 3))
        return true;

      if(this.requests.skip>0)
        if (!((chosenCard.type === 4) && this.isTypeMatch(chosenCard, topCard)))
          return false;

      if(this.requests.pull>0)
        if (!(
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
        ) return false;
    }

    if (this.isColorMatch(chosenCard, topCard))
      return true;

    if (this.isTypeMatch(chosenCard, topCard))
      return true;

    return false;

  };

  this.isInDeck = (cardArray) =>{
    let removeCount = 0;
    let testDeck = [...this.deck];
    cardArray.forEach((card) => {
      for (let i = 0; i < testDeck.length; i++)
        if (
          (testDeck[i].color === card.color) &&
          (testDeck[i].type === card.type)
        ) {
          testDeck.splice(i, 1);
          removeCount++;
          break;
        }
    });
    if (removeCount !== cardArray.length) {
      console.log("cards self-repeating error");
      return false;
    }
    return true;
  };

  this.isArrayMatch = (cardArray, topCard, noJokers) => {
    if (cardArray.length < 1) return true;
    //if (this.isMatch(cardArray[0], topCard) == false) {
    if (this.isMatch(noJokers[0], topCard) == false) {
      console.log("firstCard error");
      return false;
    }

    if(this.isInDeck(cardArray)===false)
      return false;

    for (let i = 0; i < noJokers.length - 1; i++) {
      if (this.isTypeMatch(noJokers[i], noJokers[i + 1]) === false) {
        console.log("type doesn't match");
        return false;
      }

    }
    return true;
  };

  this.getSetEffect = (cardArray) => {
    let selfRequests = JSON.parse(JSON.stringify(this.requests));
    let effects = {
      toNext: {
        pull: 0,
        skip: 0,
        type: -1,
        color: -1

      },
      toPrev: {
        pull: 0,
      }
    };

    if (cardArray.length === 0) {
      effects.toNext = {
        pull: 0,
        skip: 0,
        type: selfRequests.type,
        color: selfRequests.color
      };
    }

    cardArray.forEach((card) => {
      if (card.type === 1)
        effects.toNext.color = card.cardRequest.color;

      else if (
        (card.type === 11) && (
          this.deck.filter((deckCard) => deckCard.type === card.cardRequest.type).length > 0
        ) && (
          [5, 6, 7, 8, 9, 10, 12, 13].filter((possibleCardType) => possibleCardType === card.cardRequest.type).length > 0
        ))
        effects.toNext.type = card.cardRequest.type;

      else if (card.type === 4)
        effects.toNext.skip += 1 + selfRequests.skip;

      else if (card.type === 2)
        effects.toNext.pull += 2 + selfRequests.pull;

      else if (card.type === 3)
        effects.toNext.pull += 3 + selfRequests.pull;

      else if ((card.type === 13) && (card.color === 1))
        effects.toNext.pull += 5 + selfRequests.pull;

      else if ((card.type === 13) && (card.color === 3))
        effects.toPrev.pull += 5 + selfRequests.pull;

      selfRequests.skip = 0;
      selfRequests.pull = 0;
      selfRequests.color = -1;
      selfRequests.type = -1;
    });

    this.requests = selfRequests;

    return effects;
  };

  this.getMatchingCards = (topCard) => {
    const newMatchingDeck = [];
    this.deck.forEach((card) => {
      if (
        (this.isMatch(card, topCard)) ||
        (card.type === 0)
      ) newMatchingDeck.push(card);
    });
    return newMatchingDeck;

    // TEST LATER
    // isMatch=this.isMatch;
    // return this.deck.filter((card)=>{
    //   return isMatch(card, topCard);
    // });
  };

  this.makeMove = (props) => {

    let matchingCards = this.getMatchingCards(props.topCard);

    let chosenArray = [];
    let noJokers = [];

    // console.log(matchingCards);
    if (matchingCards.length > 0) {
      chosenArray = this.selectCardArray({
        selfID: props.selfID,
        deck: [...this.deck],
        topCard: props.topCard,
        requests: JSON.parse(JSON.stringify(this.requests)),
        playersMoves: props.playersMoves,
        playersNumber: props.playersNumber,
        matchingCards: matchingCards
      });

      noJokers = this.replaceJoker(chosenArray);

      if (this.isArrayMatch(chosenArray, props.topCard, noJokers) == false) {
        chosenArray = [];
        noJokers = [];
        console.log(algorithmName + " Wrong card array");
      }

    }
    if(chosenArray.length>0)
      this.removeFromDeck(chosenArray);

    this.lastCards = [...chosenArray];

    return {
      playerID: props.selfID,
      moveCards: noJokers,
      usedCards: chosenArray,
      effects: this.getSetEffect(noJokers),
      ownRequests: JSON.parse(JSON.stringify(this.requests)),
      deckLength: this.deck.length
    };
  };

}
module.exports = Player;
