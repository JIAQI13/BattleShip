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

    const userSquares=[];
    const computerSquares=[];

    const width =10;
    //create boards
    function createBoard(grid,squares,width){
        for (let i =0;i<width*width;i++){
            const square = document.createElement('div');
            square.dataset.id=i;
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard(userGrid,userSquares,width);
    createBoard(computerGrid,computerSquares,width);

    //ships
    const shipArray = [
        {
            name:'destoryer',
            direction:[
                [0,1],
                [0,width]
            ]
        },
        {
            name:'submarine',
            direction:[
                [0,1],
                [0,width,width*2],
            ]
        },
        {
            name:'cruiser',
            direction:[
                [0,1,2],
                [0,width,width*2],
            ]
        },
        {
            name:'battleship',
            direction:[
                [0,1,2,3],
                [0,width,width*2,width*3],
            ]
        },
        {
            name:'carrier',
            direction:[
                [0,1,2,3,4],
                [0,width,width*2,width*3,width*4],
            ]
        }
    ]

    //draw the computer ships in random locations
    function generate(ship) {
        let randomDirection = Math.floor(Math.random() * shipArray.directions.length);
        let current = ship.directions[randomDirection];
        if (randomDirection === 0) direction = 1;
        if (randomDirection === 1) direction = 10;
        let randomStart = Math.floor(Math.random()*computerSquares.length - (ship.direction[0].length*randomDirection));

    }

})