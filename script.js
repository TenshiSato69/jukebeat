function createJubeatGrid() {
    container.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Use touchstart for instant response on mobile
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            activateSquare(square);
        });

        // Click support for desktop testing
        square.addEventListener("mousedown", () => {
            activateSquare(square);
        });

        container.appendChild(square);
    }
}

function activateSquare(element) {
    element.classList.add("active");
    
    // Remove the class after a short delay to simulate a pulse
    setTimeout(() => {
        element.classList.remove("active");
    }, 150);
}

function randomPulse() {
    const squares = document.querySelectorAll(".square");
    const randomIndex = Math.floor(Math.random() * squares.length);
    activateSquare(squares[randomIndex]);
}

// Trigger a random square every 500ms
setInterval(randomPulse, 500);

createJubeatGrid();
