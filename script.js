const container = document.querySelector("#container");

function createGrid(size) {
    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
    }
}

createGrid(4);