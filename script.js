let flippedCards = [];
let flipped = 'flipped';
let matched = 'matched';
let oculted = 'oculted';

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    newDiv.dataset.status = oculted;

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  let card =  event.target;
  if(card.dataset.status !== matched)
  {
    if(card.style.backgroundColor !==  card.classList[0])
    {
      if(flippedCards.length<2)
      {
        flippedCards.push(card.classList[0])
        card.style.backgroundColor =  card.classList[0];
        card.dataset.status = flipped;

        if(flippedCards.length === 2)
        {
          if(flippedCards[0] === flippedCards[1])
          {
            let matchedCards = document.querySelectorAll('.'+ card.classList[0])
            matchedCards[0].dataset.status = matched;
            matchedCards[1].dataset.status = matched; 
            flippedCards = [];           
          }
          else
          {

            setTimeout(() => {
              let unMatchedCards = document.querySelectorAll("[data-status='"+ flipped +"']");
              for(let unMatchedCard of unMatchedCards){
                hideCard(unMatchedCard);
              }  
              flippedCards = []; 
              
            }, 1000);
          }     
            
        }
      }
    }
    else
    {


 if(flippedCards.length < 2)
 {
      let unflipIndex = flippedCards.findIndex( (element) => element === card.classList[0]);
      
      if(unflipIndex >=0){
        flippedCards.splice(unflipIndex,1);
      }

      hideCard(card);
    }
  }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


function hideCard (card)
{
  card.style.backgroundColor = 'lightgray';
  card.dataset.status = oculted;
}