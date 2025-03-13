const cardImages = ['🚒', '🧑‍🚒', '🔥', '🚨', '🧯', '🪣', '🛑', '🧑‍🚒'];
const cards = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random());
const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCards() {
    cards.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('open');
    this.textContent = this.getAttribute('data-image');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');

    if (isMatch) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('open');
            firstCard.textContent = '';
            secondCard.classList.remove('open');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

createCards();
