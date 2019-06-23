function Validator() {

  this.isActiveRequest = (requests) => {
    if (requests.skip + requests.pull > 0)
      return true;
    return false;
  };

  this.areJokersOk = (cardArray) => {
    let areOk = true;
    cardArray.forEach(card => {
      if (card.type === 0) {
        if (card.color !== 0) areOk = false;
        else if (card.cardRequest.color <= 0) areOk = false;
        else if (card.cardRequest.color > 4) areOk = false;
        else if (card.cardRequest.type <= 0) areOk = false;
        else if (card.cardRequest.type > 13) areOk = false;
      }
    });

    return areOk;
  };

  this.areRequestsOk = (cardArray) => {
    let areOk = true;
    cardArray.forEach(card => {
      if (card.type === 11) {
        if (card.cardRequest.color !== -1) areOk = false;
        else if (card.cardRequest.type > 13) areOk = false;
        else if (card.cardRequest.type === 11) areOk = false;
        else if (card.cardRequest.type === 13) {
          if (card.cardRequest.color === 3) areOk = false;
          else if (card.cardRequest.color === 1) areOk = false;
        } else if ((card.cardRequest.type <= 4) && (card.cardRequest.type > 0)) areOk = false;
        else if ((card.cardRequest.type === 12) && (card.cardRequest.color === 3)) areOk = false;

      } else if (card.type === 1) {
        if (card.cardRequest.color > 4) areOk = false;
        else if (card.cardRequest.color < -1) areOk = false;
        else if (card.cardRequest.type !== -1) areOk = false;

      } else if (card.type === 0) {
        if (this.areJokersOk([card]) === false)
          areOk = false;

      } else {
        if (card.cardRequest.type !== -1) areOk = false;
        else if (card.cardRequest.color !== -1) areOk = false;


      }

    });

    return areOk;
  };

  this.replaceJokers = (cardArray) => {
    return cardArray.map((card) => {
      if (card.type === 0) {
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

  //chosenCard, topCard, requests
  this.isColorMatch = (props) => {
    if (props.requests.color === -1) {
      if (props.chosenCard.color === props.topCard.color)
        return true;
      return false;
    } else {
      if (props.chosenCard.color === props.requests.color)
        return true;
      return false;
    }
  };

  //chosenCard, topCard, requests
  this.isTypeMatch = (props) => {
    if (props.requests.type === -1) {
      if (props.chosenCard.type === props.topCard.type)
        return true;
      return false;
    } else {
      if (props.chosenCard.type === props.requests.type) {
        if ((props.chosenCard.type === 12) && (props.chosenCard.color === 3))
          return false;

        if (
          (props.chosenCard.type === 13) && (
            (props.chosenCard.color === 1) ||
            (props.chosenCard.color === 3)
          ))
          return false;

        return true;
      }
      return false;
    }
  };

  //chosenCard, topCard, requests
  this.isFirstMatch = (props) => {


    if (this.isActiveRequest(props.requests)) {
      if ((props.chosenCard.type === 12) && (props.chosenCard.color === 3))
        return true;

      if (props.requests.skip > 0)
        if (!((props.chosenCard.type === 4) && this.isTypeMatch(props)))
          return false;

      if (props.requests.pull > 0)
        if (!(
            (props.chosenCard.type === 2) ||
            (props.chosenCard.type === 3) ||
            (
              (props.chosenCard.type === 13) &&
              (
                (props.chosenCard.color === 1) ||
                (props.chosenCard.color === 3)
              )
            )
          )) return false;
    }

    if (this.isColorMatch(props))
      return true;

    if (this.isTypeMatch(props))
      return true;

    return false;

  };

  //cardArray, deck
  this.isInDeck = (props) => {
    let removeCount = 0;
    let testDeck = [...props.deck];
    props.cardArray.forEach((card) => {
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
    if (removeCount !== props.cardArray.length) {
      console.log("cards self-repeating error");
      return false;
    }
    return true;
  };

  this.isArraySelfMatch = (noJokers) => {
    for (let i = 0; i < noJokers.length - 1; i++)
      if (this.isTypeMatch({
        chosenCard: noJokers[i],
        topCard: noJokers[i + 1],
        requests: {
          skip: 0,
          pull: 0,
          color: -1,
          type: -1
        }
       }) === false)
        return false;
    return true;
  };

  //cardArray, topCard, requests, deck
  this.isArrayMatch = (props) => {
    if (props.cardArray.length < 1) return true;

    if (this.isInDeck(props) === false) return false;

    if (this.areRequestsOk(props.cardArray) === false) return false;

    const noJokers = this.replaceJokers(props.cardArray);
    if (this.isArraySelfMatch(noJokers) === false) return false;

    if (this.isFirstMatch({
        chosenCard: noJokers[0],
        topCard: props.topCard,
        requests: props.requests
      }) == false) return false;

    return true;
  };

}

module.exports = Validator;
