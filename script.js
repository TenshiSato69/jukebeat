const container = document.querySelector("#container");
        const scoreDisplay = document.querySelector("#score-display");
        let score = 0;

        // TRACKER: Keeps track of which square each finger is currently touching
        // Format: { 0: squareDiv, 1: squareDiv, ... }
        let activeTouches = {}; 

        function createGrid() {
            container.innerHTML = '';
            for (let i = 0; i < 16; i++) {
                const square = document.createElement("div");
                square.classList.add("square");
                
                // 1. TOUCH START (New Finger touches screen)
                square.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    handleMultiTouch(e);
                }, { passive: false });

                // 2. TOUCH MOVE (Any finger moves)
                square.addEventListener("touchmove", (e) => {
                    e.preventDefault();
                    handleMultiTouch(e);
                }, { passive: false });

                // 3. TOUCH END (Finger leaves)
                square.addEventListener("touchend", (e) => {
                    e.preventDefault();
                    // Clean up the tracker for lifted fingers
                    [...e.changedTouches].forEach(touch => {
                        delete activeTouches[touch.identifier];
                    });
                });

                container.appendChild(square);
            }
        }

        function handleMultiTouch(e) {
            // Loop through EVERY finger currently on the screen
            [...e.touches].forEach(touch => {
                const x = touch.clientX;
                const y = touch.clientY;
                
                // Find what is under THIS specific finger
                const element = document.elementFromPoint(x, y);

                if (element) {
                    const actualSquare = element.closest('.square');

                    // If we found a square, and it's DIFFERENT from the last one this specific finger touched
                    if (actualSquare && activeTouches[touch.identifier] !== actualSquare) {
                        
                        triggerSquare(actualSquare);
                        
                        // Update the tracker for THIS finger ID
                        activeTouches[touch.identifier] = actualSquare;
                    }
                }
            });
        }

        function triggerSquare(element) {
            if (element.classList.contains("target")) {
                score += 100;
                scoreDisplay.textContent = `Score: ${score}`;
                element.classList.remove("target");
                element.classList.add("perfect");
                setTimeout(() => element.classList.remove("perfect"), 150);
            } else {
                element.classList.add("active");
                setTimeout(() => element.classList.remove("active"), 150);
            }
        }

        function spawnTarget() {
            const squares = document.querySelectorAll(".square");
            if (squares.length === 0) return;
            const randomSq = squares[Math.floor(Math.random() * squares.length)];
            
            if (!randomSq.classList.contains("target")) {
                randomSq.classList.add("target");
                setTimeout(() => randomSq.classList.remove("target"), 800);
            }
        }

        createGrid();
        setInterval(spawnTarget, 700);
