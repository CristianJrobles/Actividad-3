const animals = ['🐶', '🦁', '🐭', '🐸', '🐷', '🦊', '🐻', '🐼'];
let cards = [...animals, ...animals];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let time = 0;
let timer = null;
let canFlip = true;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    const shuffled = shuffle([...cards]);
    
    shuffled.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.animal = animal;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="back">❓</div>
            <div class="front">${animal}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    if (!timer) {
        startTimer();
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const animal1 = card1.dataset.animal;
    const animal2 = card2.dataset.animal;

    if (animal1 === animal2) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            matchedPairs++;
            document.getElementById('pairs').textContent = matchedPairs;
            flippedCards = [];
            canFlip = true;

            if (matchedPairs === 8) {
                winGame();
            }
        }, 600);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function winGame() {
    stopTimer();
    document.getElementById('finalTime').textContent = time;
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('winMessage').classList.add('show');
}

function resetGame() {
    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    time = 0;
    canFlip = true;
    document.getElementById('moves').textContent = 0;
    document.getElementById('time').textContent = 0;
    document.getElementById('pairs').textContent = 0;
    document.getElementById('winMessage').classList.remove('show');
    createBoard();
}

createBoard();