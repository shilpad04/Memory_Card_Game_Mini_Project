const images = [
  "deer.png", "elephant.png", "giraffe.png", "panda.png",
  "parrot.png", "rabbit.png", "sparrow.png", "tiger.png"
];

let cards = images.concat(images); // total 16 cards (each image twice)
let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardsContainer = document.getElementById("cards");
const movesDisplay = document.getElementById("moves");
movesDisplay.textContent = moves;
const resetButton = document.getElementById("reset-btn");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createCard(imageName) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");

  // Set image using <img> for better beginner experience
  const img = document.createElement("img");
  img.src = `assets/${imageName}`;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "10px";
  front.appendChild(img);

  const back = document.createElement("div");
  back.classList.add("card-back"); // uses background.png from your CSS

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  // Click logic
  card.addEventListener("click", function () {
    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;
      moves++;
      movesDisplay.textContent = moves;

      const firstImg = firstCard.querySelector("img").src;
      const secondImg = secondCard.querySelector("img").src;

      if (firstImg === secondImg) {
        // Matched
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      } else {
        // Not matched
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 800);
      }
    }
  });

  return card;
}

function setupBoard() {
  cardsContainer.innerHTML = "";
  shuffle(cards);
  moves = 0;
  movesDisplay.textContent = moves;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  for (let i = 0; i < cards.length; i++) {
    const cardElement = createCard(cards[i]);
    cardsContainer.appendChild(cardElement);
  }
}

resetButton.addEventListener("click", setupBoard);
window.addEventListener("DOMContentLoaded", setupBoard);
