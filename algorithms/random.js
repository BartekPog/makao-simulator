module.exports = (props) => {
  if (props.matchingCards.length === 0)
    return [];
  let chosenArray = props.deck.filter((card) =>
    (card.type === props.matchingCards[props.matchingCards.length - 1].type) &&
    (card.color !== props.matchingCards[props.matchingCards.length - 1].color));

  chosenArray = [props.matchingCards[props.matchingCards.length - 1]].concat(chosenArray);
  //
  // console.log();
  // console.log("matchingCards: "); console.log( props.matchingCards[props.matchingCards.length - 1]);
  // console.log("chosen length: "); console.log(chosenArray.length);
  // console.log("chosen arr "); console.log(chosenArray);
  // console.log("top card: "); console.log(props.topCard);
  // console.log("requests: "); console.log(props.requests);

  return chosenArray;
};
