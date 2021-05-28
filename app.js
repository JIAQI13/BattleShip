document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user');
    const computerGrid = document.querySelector('.grid-computer');
    const displayGrid = document.querySelector('.grid-display');
    const ships = document.querySelectorAll('.ship');
    const destroyer = document.querySelector('.destroyer-container');
    const submarine = document.querySelector('.submarine-container');
    const cruiser = document.querySelector('.cruiser-container');
    const battleship = document.querySelector('.battleship-container');
    const carrier = document.querySelector('.carrier-container');
    const StartButton = document.querySelector('#start');
    const rotateButton = document.querySelector('#rotate');
    const turnDisplay = document.querySelector('#whose-go');
    const infoDisplay = document.querySelector('#info');

    const userSquares = [];
    const computerSquares = [];

    const width = 10;
    //create boards
    function createBoard(grid, squares, width) {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.dataset.id = i;
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard(userGrid, userSquares, width);
    createBoard(computerGrid, computerSquares, width);

    //ships
    const shipArray = [
        {
            name: 'destoryer',
            directions: [
                [0, 1],
                [0, width]
            ]
        },
        {
            name: 'submarine',
            directions: [
                [0, 1],
                [0, width, width * 2],
            ]
        },
        {
            name: 'cruiser',
            directions: [
                [0, 1, 2],
                [0, width, width * 2],
            ]
        },
        {
            name: 'battleship',
            directions: [
                [0, 1, 2, 3],
                [0, width, width * 2, width * 3],
            ]
        },
        {
            name: 'carrier',
            directions: [
                [0, 1, 2, 3, 4],
                [0, width, width * 2, width * 3, width * 4],
            ]
        }
    ]

    //draw the computer ships in random locations
    function generate(ship) {
        let randomDirection = Math.floor(Math.random() * ship.directions.length);
        let current = ship.directions[randomDirection];
        if (randomDirection === 0) direction = 1;
        if (randomDirection === 1) direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));

        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

        if (!isTaken && !isAtLeftEdge && !isAtRightEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));
        else generate(ship);
    }

    generate(shipArray[0]);
    generate(shipArray[1]);
    generate(shipArray[2]);
    generate(shipArray[3]);
    generate(shipArray[4]);

    //rotate ships
    let isHorizontal = true;
    function rotate() {
        if (isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical');
            submarine.classList.toggle('submarine-container-vertical');
            cruiser.classList.toggle('cruiser-container-vertical');
            battleship.classList.toggle('battleship-container-vertical');
            carrier.classList.toggle('carrier-container-vertical');
            isHorizontal = false;
        }
        if (!isHorizontal) {
            destroyer.classList.toggle('destroyer-container');
            submarine.classList.toggle('submarine-container');
            cruiser.classList.toggle('cruiser-container');
            battleship.classList.toggle('battleship-container');
            carrier.classList.toggle('carrier-container');
            isHorizontal = true;
        }
    }
    rotateButton.addEventListener('click', rotate);

    //move around user ship
    ships.forEach(ship => ship.addEventListener('dragStart', dragStart));
    userSquares.forEach(square => square.addEventListener('dragStart', dragStart));
    userSquares.forEach(square => square.addEventListener('dragOver', dragOver));
    userSquares.forEach(square => square.addEventListener('dragEnter', dragEnter));
    userSquares.forEach(square => square.addEventListener('dragLeave', dragLeave));
    userSquares.forEach(square => square.addEventListener('dragDrop', dragDrop));
    userSquares.forEach(square => square.addEventListener('dragEnd', dragEnd));

    let selectedShipNameWithIndex = 0;
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        selectedShipNameWithIndex = e.target.id;
    }))

    function dragStart(e) {
        draggedShip = this;
        draggedShipLength = draggedShip.length;
        console.log(draggedShip);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        console.log('drag leave');
    }

    function dragDrop() {
        let shipNameWithLastId = draggedShip.lastChild.id;
        let shipClass = shipNameWithLastId.slice(0, -2);
        console.log(shipClass);
    }

    function dragEnd() {

    }
})