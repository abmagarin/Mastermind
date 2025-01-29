document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll(".square");
    let okButtons = document.querySelectorAll(".button-30");
    let startButton = document.querySelector(".start-button");
    let restartButton = document.querySelector(".restart-button");
    let points = document.querySelectorAll(".point");
    let endScreen = document.querySelector(".endScreen");
    let endPage = document.querySelector(".endPage");
    let guesses = -1;
    let combination = [0, 0, 0, 0, 0];
    let resultText = document.querySelector(".resultText");
    let resultRow = document.querySelector(".resultRow");

    //COMBINATION AND START//////////////////////////////////

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    startButton.addEventListener('click', (event) => {
        startButton.blur();
        if (startButton.textContent === 'START') {
            guesses = 0;
            updateButtonVisibility();
            combination = [random(0, 4), random(0, 4), random(0, 4), random(0, 4), random(0, 4)];
            startButton.textContent = "QUIT";
        }
        else {
            startButton.textContent = 'START';
            guesses = -1;
            updateButtonVisibility();
        }
        okButtons.forEach((button, index) => {
            if (guesses !== index) {
                button.style.visibility = 'hidden';

            } else {
                button.style.visibility = 'visible';
            }
        });
        squares.forEach(element => {
            element.style.backgroundColor = '#edf2f4';
        });
        points.forEach(element => {
            element.style.backgroundColor = '#edf2f4';
        });
    });

    //OK BUTTONS////////////////////////////////////////////////////

    okButtons.forEach(element => {
        element.addEventListener('click', (event) => {
            checkComb();
            guesses = guesses + 1;
            updateButtonVisibility();
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            okButtons[guesses].click();
        }
    });


    function updateButtonVisibility() {
        okButtons.forEach((button, index) => {
            if (guesses !== index) {
                button.style.visibility = 'hidden';

            } else {
                button.style.visibility = 'visible';
            }

        });

        squares.forEach(square => {
            square.style.borderRadius = "0px";
        });

        let start = guesses * 5;
        for (let i = 0; i < 5; i++) {
            if (squares[start + i]) {
                squares[start + i].style.borderRadius = "10px";
            }
        }
    }

    //POINTS//////////////////////////////////////

    function checkComb() {
        let totalColor = 0;
        let totalPosition = 0;

        let usedSquares = Array(squares.length).fill(false);
        let usedCombination = Array(combination.length).fill(false);

        squares.forEach((element, indexSquare) => {
            if (indexSquare >= guesses * 5 && indexSquare <= (guesses * 5) + 4) {
                const colorNumber = colorToNumber(element.style.backgroundColor);
                const relativeIndex = indexSquare - (guesses * 5);

                if (colorNumber === combination[relativeIndex]) {
                    totalPosition++;
                    usedSquares[indexSquare] = true;
                    usedCombination[relativeIndex] = true;
                }
            }
        });

        squares.forEach((element, indexSquare) => {
            if (indexSquare >= guesses * 5 && indexSquare <= (guesses * 5) + 4) {
                const colorNumber = colorToNumber(element.style.backgroundColor);

                if (!usedSquares[indexSquare]) {
                    for (let indexComb = 0; indexComb < combination.length; indexComb++) {
                        if (!usedCombination[indexComb] && colorNumber === combination[indexComb]) {
                            totalColor++;
                            usedSquares[indexSquare] = true;
                            usedCombination[indexComb] = true;
                            break;
                        }
                    }
                }
            }
        });

        let result = [totalPosition, totalColor];

        validatePoints(result);
    }


    function validatePoints(results) {
        points.forEach((element, index) => {
            if (index >= guesses * 5 && index <= (guesses * 5) + 4) {
                const relativeIndex = index - (guesses * 5);

                if (relativeIndex < results[0]) {
                    element.style.backgroundColor = '#2b2d42';
                } else if (relativeIndex < results[0] + results[1]) {
                    element.style.backgroundColor = '#55587e';
                }
            }
        });
        console.log(results[0]);
        console.log(guesses);
        if (results[0] === 5) {
            setScreen(true);
        } else if (guesses === 7) {
            setScreen(false);
        }

    }

    //SQUARE COLOR SWAP////////////////////////////////////

    squares.forEach((element, index) => {
        element.addEventListener('wheel', (event) => {
            event.preventDefault();
            let mycolor = 0;
            if (event.deltaY > 0) {
                mycolor = colorToNumber(element.style.backgroundColor);
                mycolor = mycolor + 1;
                if (mycolor === 5) {
                    mycolor = 0;
                }
            } else {
                mycolor = colorToNumber(element.style.backgroundColor);
                mycolor = mycolor - 1;
                if (mycolor === -1) {
                    mycolor = 4;
                }
            }
            if ((index >= guesses * 5) && (index <= (guesses * 5) + 4)) {
                setColor(element, mycolor);
            }
        });
    });

    function colorToNumber(color) {
        if (color === 'rgb(249, 65, 68)') {
            return 0;
        }
        if (color === 'rgb(249, 199, 79)') {
            return 1;
        }
        if (color === 'rgb(144, 190, 109)') {
            return 2;
        }
        if (color === 'rgb(39, 125, 161)') {
            return 3;
        }
        if (color === 'rgb(237, 242, 244)') {
            return 4;
        }
        return 0;
    }

    function setColor(mysquare, numcolor) {
        if (numcolor === 0) {
            mysquare.style.backgroundColor = '#f94144';
        }
        if (numcolor === 1) {
            mysquare.style.backgroundColor = '#f9c74f';
        }
        if (numcolor === 2) {
            mysquare.style.backgroundColor = '#90be6d';
        }
        if (numcolor === 3) {
            mysquare.style.backgroundColor = '#277da1';
        }
        if (numcolor === 4) {
            mysquare.style.backgroundColor = '#edf2f4';
        }
    }
    updateButtonVisibility();

    //POINTS SCREEN////////////////////////////

    function setScreen(state) {
        endScreen.classList.toggle('hidden');
        endScreen.classList.toggle('visible');

        if (state === false) {
            resultText.textContent = "GAME OVER";
        } else {
            resultText.textContent = "YOU WIN";
        }
        setTimeout(() => {
            resultText.classList.toggle('hidden');
            resultText.classList.toggle('visibleSolid');
            resultRow.classList.toggle('hidden');
            resultRow.classList.toggle('visibleSolid');
            restartButton.classList.toggle('hidden');
            restartButton.classList.toggle('visibleSolid');
        }, 1000);
        const resultSquares = resultRow.children;
        setTimeout(() => {
            for (let i = 0; i < resultSquares.length; i++) {
                setTimeout(() => {
                    setColor(resultSquares[i], combination[i]);
                }, 300 * i);
            }
        }, 2000);
    }

    restartButton.addEventListener('click', (event) => {
        restartButton.blur();
        guesses = 0;
        updateButtonVisibility();
        combination = [random(0, 4), random(0, 4), random(0, 4), random(0, 4), random(0, 4)];
        okButtons.forEach((button, index) => {
            if (guesses !== index) {
                button.style.visibility = 'hidden';

            } else {
                button.style.visibility = 'visible';
            }
        });
        squares.forEach(element => {
            element.style.backgroundColor = '#edf2f4';
        });
        points.forEach(element => {
            element.style.backgroundColor = '#edf2f4';
        });

        let children = resultRow.children;

        for (let i = 0; i < children.length; i++) {
            children[i].style.backgroundColor = '#edf2f4';
        }

        children = endPage.children;

        for (let i = 0; i < children.length; i++) {
            if (!children[i].classList.contains("endScreen")) {
                children[i].classList.toggle('visibleSolid');
            } else {
                children[i].classList.toggle('visible');
            }
            children[i].classList.toggle('hidden');
        }
    });

});


