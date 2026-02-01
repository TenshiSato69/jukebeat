const container = document.querySelector("#container");
const scoreDisplay = document.querySelector("#score-display");
let score = 0;
let lastActiveSquare = null; // Prevents "machine gun" firing on one square

function createJubeatGrid() {
    container.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // 1. TOUCH START (When you first tap)
        square.addEventListener("touchstart", (e) => {
            e.preventDefault(); // Stop tablet quirks
            handleInput(square);
            lastActiveSquare = square;
        }, { passive: false });

        // 2. TOUCH MOVE (When you slide your finger)
        square.addEventListener("touchmove", (e) => {
            e.preventDefault(); // STOP SCROLLING
            
            // Get finger position
            const touch = e.touches[0];
            
            // Identify element under finger
            const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (!targetElement) return; // Finger went off screen

            // Ensure we grabbed a square (and not the container border)
            const actualSquare = targetElement.closest('.square');

            // Only activate if it's a NEW square
            if (actualSquare && actualSquare !== lastActiveSquare) {
                handleInput(actualSquare);
                lastActiveSquare = actualSquare;
            }
        }, { passive: false });

        container.appendChild(square);
    }
}

// Reset tracker when finger leaves screen
document.addEventListener("touchend", () => {
    lastActiveSquare = null;
});

function handleInput(element) {
    // Scoring Logic
    if (element.classList.contains("target")) {
        score += 100;
        scoreDisplay.textContent = `Score: ${score}`;
        element.classList.remove("target");
        
        // Green flash for a "Perfect" hit
        element.style.backgroundColor = "#00ff00";
    }
    
    activateSquare(element);
}

function activateSquare(element) {
    element.classList.add("active");
    
    // Turn off light after 150ms
    setTimeout(() => {
        element.classList.remove("active");
        element.style.backgroundColor = ""; // Clear any manual colors
    }, 150);
}

// Start Game
createJubeatGrid();