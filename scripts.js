const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipcard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // primeira click na carta
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    // secundo click na carta
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
        
}
function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        } else {
            unflipCards();
        }
}

function disableCards() {
    firstCard.removeEventListenet('click', flipcard);
    secondCard.removeEventListenet('click', flipcard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipcard));

