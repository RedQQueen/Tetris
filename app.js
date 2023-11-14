document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10;
    let nextRandom = 0;
    let timerId

    const lTetromino =[
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
      [width+1, width+2, width*2, width*2+1],
      [0, width, width+1, width*2+1],
      [width+1, width+2, width*2, width*2+1],
      [0, width, width+1, width*2+1]
    ];

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],  
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]

    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino ];

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
    

    //drawing the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

//timerId = setInterval(moveDown, 800)


//assign functions to keyCodes
function control(e) {
    if(e.keyCode === 37){
        moveLeft()
    }  else if(e.keyCode === 38) {
        rotate()
    }  else if(e.keyCode === 39) {
        moveRight()
    }   else if(e.keyCode === 40) {
        moveDown()
    }
}
        
document.addEventListener('keyup', control)


        function moveDown() {
            undraw()
            currentPosition += width
            draw()
            freeze()
            displayShape()
        }
        
        //freeze
        function freeze() {
            if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
                current.forEach(index => squares[currentPosition + index].classList.add('taken'))
                //start a new tetrominoi to start falling
                random = nextRandom
                nextRandom = Math.floor(Math.random() * theTetrominoes.length)
                current = theTetrominoes[random][currentRotation]
                currentPosition = 4;
                draw()
                
            }
        }
        
        //move tetromino left, unless it is at the edge or there is a blockage
        
function moveLeft() { 
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

function rotate() {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//show up-next tetromino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


let upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
];


//display the next shape in mini-grid display

function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        // square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        // displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })

}



///add functionality to the button

startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})


})