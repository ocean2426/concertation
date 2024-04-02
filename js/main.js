/*----- constants -----*/
//i have you each card twice
// then shuffled and used for the game
const SEACEATURES_CARDS = [
    {img: 'https://i.imgur.com/MC5pCst.jpeg', matched: false}, //turtle
    {img: 'https://i.imgur.com/ILbJCgk.png', matched: false}, //jellyfish
    {img: 'https://i.imgur.com/RAJv494.jpeg', matched: false}, //seahorse
    {img: 'https://i.imgur.com/Hcyeojg.jpeg', matched: false}, //octopus
    {img: 'https://i.imgur.com/sS70g3z.jpeg', matched: false}, //dolphin
    {img: 'https://i.imgur.com/6nznLgUb.jpg', matched: false}, //shark
    {img: 'https://i.imgur.com/eePPb6T.jpeg', matched: false}, //mermaid
    {img: 'https://i.imgur.com/xHGu5nP.jpeg', matched: false} //crab
];

const CARD_BACK = 'https://i.imgur.com/vEOk6lv.jpeg';

/*----- app's state (variables) -----*/
let Cards;
let firstCard; // the first card that was clicked


/*----- cached element references -----*/



/*----- event listeners -----*/
document.querySelector('board').addEventListener('click', handleClick);



/*----- functions -----*/
initialize();

// Initialize all state variables, then call render()
function initialize() {
  Cards = getShuffleCards();
  firstCard = 0;
  render();
}

function render() {
  Cards.forEach(function(card, index) {
   const cardEl = document.getElementById(index);
    const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
   cardEl.src = src;
 });
}
               
function getShuffleCards() {
  const tempCards = [];
  const cards = [];
 for (let card of SEACEATURES_CARDS){
   tempCards.push({...card}, {...card})
 }
  while (tempCards.length) {
    const randomIndex = Math.floor(Math.random() * tempCards.length);
     let card = tempCards.splice(randomIndex, 1)[0];
    cards.push(card);
  }

  
  return cards;
  
}


function handleClick(evt){
  const card = evt.target;
  const cardIndex = parseInt(card.id);
  if (card.src === CARD_BACK) {
    card.src = Cards[cardIndex].img;
    if (!firstCard) {
      firstCard = cardIndex;
    } else {
      const secondCard = cardIndex;
      if (Cards[firstCard].img === Cards[secondCard].img) {
        Cards[firstCard].matched = true;
        Cards[secondCard].matched = true;
        firstCard = 0;
      } else {
        setTimeout(() => {
          card.src = CARD_BACK;
          Cards[firstCard].src = CARD_BACK;
          firstCard = 0;
        }, 1000);
      }
    }
  }
}