//Set first matching card as main
//Add other matching to main
//keep jokers until the last card

const Validator = require("./validation");

module.exports = (props) => {
  let firstIndex = 0;

  while ((props.matchingCards[firstIndex].type === 0) &&
    (firstIndex<props.matchingCards.length-1))
    firstIndex++;

  if (props.matchingCards.length === 0)
    return [];
    
  let chosenArray = props.deck.filter((card) =>
    (card.type === props.matchingCards[firstIndex].type) &&
    (card.color !== props.matchingCards[firstIndex].color));

  //Jokers handling
  let jokerArr = props.matchingCards.filter(card => card.type === 0);

  if(jokerArr.length === props.matchingCards.length)
    return [];


  if(props.deck.length-chosenArray.length===jokerArr.length){
    jokerArr.forEach(joker => joker.cardRequest = {
      type: props.matchingCards[firstIndex].type,
      color: 2,
      cardRequest: {
        color: -1,
        type: -1
      }
    });
    chosenArray = [props.matchingCards[firstIndex]].concat(...jokerArr, ...chosenArray);
  }
  else chosenArray = [props.matchingCards[firstIndex]].concat( ...chosenArray);

  const val = new Validator();

  if(val.isArrayMatch({
    cardArray: chosenArray,
    topCard: props.topCard,
    requests: props.requests,
    deck: props.deck
  })===false) console.log("err");

  //
  // console.log();
  // console.log("matchingCards: "); console.log( props.matchingCards[firstIndex]);
  // console.log("chosen length: "); console.log(chosenArray.length);
  // console.log("chosen arr "); console.log(chosenArray);
  // console.log("top card: "); console.log(props.topCard);
  // console.log("requests: "); console.log(props.requests);

  return chosenArray;
};
