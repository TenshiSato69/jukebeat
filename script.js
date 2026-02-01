// script.js
const container = document.querySelector("#container");
const scoreDisplay = document.querySelector("#score-display");
let score = 0;

function createJubeatGrid() {
    container.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // 1. Initial Tap
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleInput(square);
        });

        // 2. Swiping/Sliding Logic
        square.addEventListener("touchmove", (e) => {
            e.preventDefault();
            // Get the coordinates of the first finger
            const touch = e.touches[0];
            // Find the element at those exact coordinates
            const target = document.elementFromPoint(touch.clientX, touch.clientY);

            // If the element is a square and wasn't JUST hit, activate it
            if (target && target.classList.contains("square")) {
                // We only want to trigger handleInput if the finger 
                // has entered a NEW square, not while moving inside the same one.
                if (!target.classList.contains("active")) {
                    handleInput(target);
                }
            }
        }, { passive: false });

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

// Initialize
createJubeatGrid();
