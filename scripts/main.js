document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll(".square");

    squares.forEach(element => {
        element.addEventListener('wheel', (event) => {
            event.preventDefault();
            if (event.deltaY > 0) {
                element.style.backgroundColor = 'red';
            } else {
                console.log("Desplazamiento hacia arriba");
                element.style.backgroundColor = 'blue';
            }
        });
    });
});