const Card=require("./card.js");

module.exports=()=>{
  let deck=[];

  for (let color=1; color<=4; color++)
  for(let type=1; type<=13; type++){
    deck.push(new Card(color, type, {color:-1, type:-1}));
  }

  deck.push(new Card(0,0,{color:-1, type:-1}));
  deck.push(new Card(0,0,{color:-1, type:-1}));

  return deck;
};
