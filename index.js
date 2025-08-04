const images = [
  "deer.png", "elephant.png", "giraffe.png", "panda.png",
  "parrot.png", "rabbit.png", "sparrow.png", "tiger.png"
];

let cardsList = images.concat(images);
let firstFlipped = null;
let secondFlipped = null;
let isBoardLocked = false;
let totalMoves = 0;

const board = document.getElementById("cards");
const movesText = document.getElementById("moves");
const resetGameBtn = document.getElementById("reset-btn");

// Create notification
const popup = document.createElement("div");
popup.id = "notification";
popup.style.display = "none";

const message = document.createElement("p");
message.style.marginBottom = "10px";

const playAgain = document.createElement("button");
playAgain.textContent = "Play Again";
playAgain.className = "reset-btn";
playAgain.addEventListener("click", startGame);

popup.appendChild(message);
popup.appendChild(playAgain);
document.querySelector(".card-container").appendChild(popup);

function shuffleCards(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randIndex];
    arr[randIndex] = temp;
  }
}

function createCardElement(imgName) {
  let card = document.createElement("div");
  card.classList.add("card");

  let inner = document.createElement("div");
  inner.classList.add("card-inner");

  let frontSide = document.createElement("div");
  frontSide.classList.add("card-front");

  let image = document.createElement("img");
  image.src = "assets/" + imgName;
  image.alt = imgName;
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.borderRadius = "10px";
  frontSide.appendChild(image);

  let backSide = document.createElement("div");
  backSide.classList.add("card-back");

  inner.appendChild(frontSide);
  inner.appendChild(backSide);
  card.appendChild(inner);

  card.addEventListener("click", function () {
    cardClicked(card);
  });

  return card;
}

function cardClicked(card) {
  if (isBoardLocked || card.classList.contains("flipped")) {
    return;
  }

  card.classList.add("flipped");

  if (firstFlipped === null) {
    firstFlipped = card;
  } else {
    secondFlipped = card;
    isBoardLocked = true;
    totalMoves++;
    movesText.textContent = totalMoves;

    let img1 = firstFlipped.querySelector("img").src;
    let img2 = secondFlipped.querySelector("img").src;

    if (img1 === img2) {
      firstFlipped = null;
      secondFlipped = null;
      isBoardLocked = false;
      checkIfGameWon();
    } else {
      setTimeout(function () {
        firstFlipped.classList.remove("flipped");
        secondFlipped.classList.remove("flipped");
        firstFlipped = null;
        secondFlipped = null;
        isBoardLocked = false;
      }, 800);
    }
  }
}

function checkIfGameWon() {
  let allFlipped = document.querySelectorAll(".card.flipped").length;
  if (allFlipped === cardsList.length) {
    message.textContent = "You found all the matches in " + totalMoves + " moves!!!";
    popup.style.display = "block";
  }
}

function startGame() {
  board.innerHTML = "";
  shuffleCards(cardsList);
  totalMoves = 0;
  movesText.textContent = totalMoves;
  firstFlipped = null;
  secondFlipped = null;
  isBoardLocked = false;
  popup.style.display = "none";

  for (let i = 0; i < cardsList.length; i++) {
    let cardElement = createCardElement(cardsList[i]);
    board.appendChild(cardElement);
  }
}

resetGameBtn.addEventListener("click", startGame);
window.addEventListener("DOMContentLoaded", startGame);
