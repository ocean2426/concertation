/*----- constants -----*/
//i have you each card twice
// then shuffled and used for the game
const SEACEATURES_CARDS = [
  { img: 'https://i.imgur.com/dV1hFFZ.png', matched: false }, //turtle
  { img: 'https://i.imgur.com/ILbJCgk.png', matched: false }, //jellyfish
  { img: 'https://i.imgur.com/RAJv494.jpeg', matched: false }, //seahorse
  { img: 'https://i.imgur.com/Hcyeojg.jpeg', matched: false }, //octopus
  { img: 'https://i.imgur.com/sS70g3z.jpeg', matched: false }, //dolphin
  { img: 'https://i.imgur.com/6nznLgUb.jpg', matched: false }, //shark
  { img: 'https://i.imgur.com/eePPb6T.jpeg', matched: false }, //mermaid
  { img: 'https://i.imgur.com/xHGu5nP.jpeg', matched: false } //crab
];

const CARD_BACK = 'https://i.imgur.com/vEOk6lv.jpeg';

/*----- app's state (variables) -----*/
let Cards;
let firstCard; // the first card that was clicked
let numBad;
let maxBad;
let ignoreClick;
let winner;
let secondCard; // second card play clicked
let gameOver

/*----- cached element references -----*/
const message = document.querySelector('h3');
const playAgin = document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('section').addEventListener('click', handleClick);
playAgin.addEventListener('click', initialize);

/*----- functions -----*/
initialize();

// Initialize all state variables, then call render()
function initialize() {
  Cards = getShuffleCards();
  firstCard = 0;
  secondCard = 0;
  ignoreClick = false;
  numBad = 0;
  maxBad = 3;
  winner = false;
  gameOver = false;
  playAgin.innerHTML = 0;
  playAgin.style.display = 'none';
  render();
}

function render() {
  Cards.forEach(function (card, index) {
    const cardEl = document.getElementById(index);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    cardEl.src = src;
  });
  message.innerText = `Wrong Guesses: ${numBad}`;
  if (winner) {
    message.innerText = `You got all of them!`;
    playAgin.innerHTML = 'Reshuffle Cards';
    playAgin.style.display = 'block';
  }
  //game over
  if (gameOver) {
    message.innerText = 'Awe, To Many Wrong Guesses';
    playAgin.innerHTML = 'Reshuffle Cards';
    playAgin.style.display = 'block';
  }
}

function getShuffleCards() {
  const tempCards = [];
  const cards = [];
  for (let card of SEACEATURES_CARDS) {
    tempCards.push({ ...card }, { ...card })
  }
  while (tempCards.length) {
    const randomIndex = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(randomIndex, 1)[0];
    cards.push(card);
  }
  return cards;
}

function handleClick(evt) {
  const cardIndex = parseInt(evt.target.id);
  const card = Cards[cardIndex];
  if (isNaN(cardIndex) || ignoreClick || card.matched || winner || gameOver) return;
  if (firstCard) {
    secondCard = card
    if (secondCard) {
      if (firstCard.img === secondCard.img) {
        // correct match
        firstCard.matched = secondCard.matched = true;
        firstCard = 0;
        secondCard = 0;
        //how you know who have won
        if (Cards.every(card => card.matched)) {
          winner = true;
          render();
        }
      } else {
        //wrong matches
        ignoreClick = true;
        firstCard.matched = true;
        numBad++;
        gameOver = numBad === maxBad;
        setTimeout(() => {
          ignoreClick = false;
          firstCard.matched = false;
          firstCard = null;
          secondCard = null;
          render();
        }, 1000)

      }
    }
  } else {
    firstCard = card;
  }
  render();
}