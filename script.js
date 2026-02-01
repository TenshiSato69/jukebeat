// script.js
const container = document.querySelector("#container");
const scoreDisplay = document.querySelector("#score-display");
let score = 0;

function createJubeatGrid() {
    container.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Mobile Touch
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleInput(square);
        });

        // Desktop Click
        square.addEventListener("mousedown", () => {
            handleInput(square);
        });

        container.appendChild(square);
    }
}

function handleInput(element) {
    // Check if the square was a target when tapped
    if (element.classList.contains("target")) {
        score += 100;
        scoreDisplay.textContent = `Score: ${score}`;
        element.classList.remove("target");
    }
    
    // Visual feedback
    activateSquare(element);
}

function activateSquare(element) {
    element.classList.add("active");
    setTimeout(() => {
        element.classList.remove("active");
    }, 150);
}

function spawnTarget() {
    const squares = document.querySelectorAll(".square");
    const randomIndex = Math.floor(Math.random() * squares.length);
    const targetSquare = squares[randomIndex];

    // Light up the target for a limited window
    targetSquare.classList.add("target");

    // The target disappears after 600ms if not hit
    setTimeout(() => {
        targetSquare.classList.remove("target");
    }, 600);
}

// Initialize
createJubeatGrid();

// Start the game loop (Spawns a target every 800ms)
setInterval(spawnTarget, 800);
