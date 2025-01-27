document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll(".square");
    let okButtons = document.querySelectorAll(".button-30");
    let startButton = document.querySelector(".start-button");
    let points = document.querySelectorAll(".point");
    let guesses = -1;
    let combination = [0, 0, 0, 0, 0];

    //COMBINATION AND START//////////////////////////////////

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    startButton.addEventListener('click', (event) => {
        if (startButton.textContent === 'START') {
            guesses = 0;
            updateButtonVisibility();
            combination = [random(0, 4), random(0, 4), random(0, 4), random(0, 4), random(0, 4)];
            startButton.textContent = combination;
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

    function updateButtonVisibility() {
        okButtons.forEach((button, index) => {
            if (guesses !== index) {
                button.style.visibility = 'hidden';

            } else {
                button.style.visibility = 'visible';
            }
        });
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
                    combination.forEach((number, indexComb) => {
                        if (!usedCombination[indexComb] && colorNumber === number) {
                            totalColor++;
                            usedSquares[indexSquare] = true;
                            usedCombination[indexComb] = true;
                        }
                    });
                }
            }
        });

        let result = [totalPosition, totalColor];
        validatePoints(result);
    }


    function validatePoints(results) {
        points.forEach((element, index) => {
            let pointsAssigned = 0;
            if ((index >= guesses * 5) && (index <= (guesses * 5) + 4)) {
                if (((index - guesses * 5) == 0) && (results[0] >= 1)) {
                    element.style.backgroundColor = '#2b2d42';
                    results[1]++;
                } else if (((index - guesses * 5) == 0) && (results[1] >= 1)) {
                    element.style.backgroundColor = '#55587e';
                }
                if (((index - guesses * 5) == 1) && (results[0] >= 2)) {
                    element.style.backgroundColor = '#2b2d42';
                    results[1]++;
                } else if (((index - guesses * 5) == 1) && (results[1] >= 2)) {
                    element.style.backgroundColor = '#55587e';
                }
                if (((index - guesses * 5) == 2) && (results[0] >= 3)) {
                    element.style.backgroundColor = '#2b2d42';
                    results[1]++;
                } else if (((index - guesses * 5) == 2) && (results[1] >= 3)) {
                    element.style.backgroundColor = '#55587e';
                }
                if (((index - guesses * 5) == 3) && (results[0] >= 4)) {
                    element.style.backgroundColor = '#2b2d42';
                    results[1]++;
                } else if (((index - guesses * 5) == 3) && (results[1] >= 4)) {
                    element.style.backgroundColor = '#55587e';
                }
                if (((index - guesses * 5) == 4) && (results[0] >= 5)) {
                    element.style.backgroundColor = '#2b2d42';
                    results[1]++;
                } else if (((index - guesses * 5) == 4) && (results[1] >= 5)) {
                    element.style.backgroundColor = '#55587e';
                }

            }
        });
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
});