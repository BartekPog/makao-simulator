// Card = (color, type)=>{
//   this.color= color;
//   this.type= type;
// };

function Card(color,type, request){
    this.color= color;
    this.type= type;
    this.cardRequest=request;
}
module.exports=Card;
