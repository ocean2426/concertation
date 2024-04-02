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
let numBad;
let ignoreClick;


/*----- cached element references -----*/
const message = document.querySelector('h3');


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);



/*----- functions -----*/
initialize();

// Initialize all state variables, then call render()
function initialize() {
  Cards = getShuffleCards();
  firstCard = 0;
  ignoreClick = false;
  numBad = 0;
  render();
}

function render() {
  Cards.forEach(function(card, index) {
   const cardEl = document.getElementById(index);
    const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
   cardEl.src = src;
 });
  message.innerText = `Wrong Guesses: ${numBad}`;
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
  const cardIndex = parseInt(evt.target.id);
  if (isNaN(cardIndex) || ignoreClick) return;
  const card = Cards[cardIndex];
  if (firstCard) {
    if (firstCard.img === card.img) {
      // correct match
      firstCard.matched = card.matched = true;
    } 
    else {
      //wrong matches
      ignoreClick = true;
      numBad++;
      setTimeout(() => {
        firstCard.src = CARD_BACK;
        card.src = CARD_BACK;
        ignoreClick = false;
        render();
    }, 1000)
      
    }
      firstCard = 0;
  }
  else {
    firstCard = card;
  }
  render();
}