module.exports = (props) => {
  if (props.matchingCards.length === 0)
    return [];
  let chosenArray = props.deck.filter((card) =>
    (card.type === props.matchingCards[0].type) &&
    (card.color !== props.matchingCards[0].color));

  chosenArray = [props.matchingCards[0]].concat([...chosenArray]);
  //
  // console.log();
  // console.log("matchingCards: "); console.log( props.matchingCards[0]);
  // console.log("chosen length: "); console.log(chosenArray.length);
  // console.log("chosen arr "); console.log(chosenArray);
  // console.log("top card: "); console.log(props.topCard);
  // console.log("requests: "); console.log(props.requests);

  return chosenArray;
};
