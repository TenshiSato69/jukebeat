const container = document.querySelector("#container");
const btn = document.querySelector("#resize-btn");

function createGrid(squaresPerSide) {
    // Clear the existing grid before creating a new one
    container.innerHTML = '';
    
    // Calculate the dimensions so the grid stays exactly 960px wide
    const totalSquares = squaresPerSide * squaresPerSide;
    const sizeInPx = 960 / squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        
        // Dynamically set the size based on the user's input
        square.style.width = `${sizeInPx}px`;
        square.style.height = `${sizeInPx}px`;

        // Add the "hover" effect (Step 3 in your image)
        square.addEventListener("mouseenter", () => {
            square.classList.add("hovered");
        });

        square.addEventListener("mouseleave", () => {
            square.classList.remove("hovered");
        });

        container.appendChild(square);
    }
}

// Initial 16x16 grid setup
createGrid(16);

// Handle the "Change Size" button (Step 4 in your image)
btn.addEventListener("click", () => {
    let newSize = prompt("Enter number of squares per side (Max 100):");
    
    newSize = parseInt(newSize);

    // Validate the input to ensure it's a number between 1 and 100
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert("Please enter a valid number between 1 and 100.");
    }
});
