//Set first matching card as main
//Add other matching to main
//keep jokers until the last card

const Validator = require("./validation");

module.exports = (props) => {
  if(props.deck.length<=0)
    return [];

  const val = new Validator();
  let chosenArray = [];

  //Jokers handling
  let jokerArr = props.matchingCards.filter(card => card.type === 0);

  if (jokerArr.length === props.deck.length) {

  //only jokers
    jokerArr.forEach(joker => {
      joker.cardRequest = {
        color: props.topCard.color,
        type: props.topCard.type,
        cardRequest: {
          color: -1,
          type: -1
        }
      };
    });
    chosenArray=jokerArr;

    if (val.isArrayMatch({
        cardArray: chosenArray,
        topCard: props.topCard,
        requests: props.requests,
        deck: props.deck
      }) === true) return chosenArray;

    jokerArr.forEach(joker => {
      joker.cardRequest = {
        color: 3,
        type: 12,
        cardRequest: {
          color: -1,
          type: -1
        }
      };
    });
    chosenArray = jokerArr;

    if (val.isArrayMatch({
        cardArray: chosenArray,
        topCard: props.topCard,
        requests: props.requests,
        deck: props.deck
      }) === true) return chosenArray;

    return [];

  }

  if (jokerArr.length > 0) {
    let other = props.deck.filter(card => card.type !== 0);
    let oneType = true;
    for (let i = 0; i < other.length - 1; i++)
      if (other[i].type !== other[i + 1].type)
        oneType = false;

    if (oneType) {
      jokerArr.forEach(joker => {
        joker.cardRequest = {
          color: props.topCard.color,
          type: other[0].type,
          cardRequest: {
            color: -1,
            type: -1
          }
        };
      });

      chosenArray = jokerArr.concat(...other);

      if (val.isArrayMatch({
          cardArray: chosenArray,
          topCard: props.topCard,
          requests: props.requests,
          deck: props.deck
        }) === true) return chosenArray;
    }
  }

  //other handling


  if (jokerArr.length === props.matchingCards.length)
    return [];

  let firstIndex = 0;

  while ((props.matchingCards[firstIndex].type === 0) &&
    (firstIndex < props.matchingCards.length - 1))
    firstIndex++;

  if (props.matchingCards.length === 0)
    return [];

  chosenArray = props.deck.filter((card) =>
    (card.type === props.matchingCards[firstIndex].type) &&
    (card.color !== props.matchingCards[firstIndex].color));

  chosenArray = [props.matchingCards[firstIndex]].concat(...chosenArray);

  if (val.isArrayMatch({
      cardArray: chosenArray,
      topCard: props.topCard,
      requests: props.requests,
      deck: props.deck
    }) === false) console.log("err");

  //
  // console.log();
  // console.log("matchingCards: "); console.log( props.matchingCards[firstIndex]);
  // console.log("chosen length: "); console.log(chosenArray.length);
  // console.log("chosen arr "); console.log(chosenArray);
  // console.log("top card: "); console.log(props.topCard);
  // console.log("requests: "); console.log(props.requests);

  return chosenArray;
};
