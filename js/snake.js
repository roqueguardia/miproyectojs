document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn =document.querySelector('.start')

    const width = 10 
    let currentIndex = 0 //primer div de nuestro grid
    let appleIndex = 0 //primer div de nuestro grid
    let currentSnake = [2,1,0] //2 es la cabeza, 1 es la cola y 0 es el cuerpo
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime= 0
    let interval = 0 

//para empezar y reiniciar el juego
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}

//funcion que trata de todo lo que hace la vibora

function moveOutcomes() {

    //funcion para cuando la vibora toca los bordes y se come a si misma
    if(
(currentSnake[0] + width >= (width*width) && direction === width ) || //if la vibora come la manzana
(currentSnake[0] % width === width -1 && direction === 1) || //si la vobora choca la pared derecha
(currentSnake[0] % width === 0 && direction === -1) || //si la vibora choca la pared izquierda
(currentSnake[0] - width < 0 && direction === -width) ||//si la vibora tocha el techo
squares[currentSnake[0] + direction].classList.contains('snake') //si la vibora se come a si misma
    ) {
        return clearInterval(interval) // esto reinicia el intervalo si algo de lo de arriba sucede
    }

    const tail = currentSnake.pop() //remueve el ultimo ite del array
    squares[tail].classList.remove('snake') //remueve la clase snake del la cola
    currentSnake.unshift(currentSnake[0] + direction) //da direccion a la cabeza del array

    //funcion para cuando la vibora come la manzana
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

//generar nueva manzana una vez que se comio
function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


    //asisnando funciones a las teclas
    function control(e) {
        squares[currentIndex].classList.remove('snake') //removemos la clase skane de TODOS los cuadrados

            if(e.keyCode === 39) {
                direction = 1 // si presionamos la flecha derecha de nestro teclado, la vibora va hacia la derecha
            }else if (e.keyCode === 38) {
                direction = -width //si presionamos la flecha de arriba, la vibora vuelve a los 10 divs anteriores y parece que sube
            }else if (e.keyCode === 37) {
                direction = -1 //si presionamos la felcha izquierda, la vibora se meve hacia la izquierda
            }else if (e.keyCode === 40) {
                direction = +width //si presionamos hacia abajo, la cabeza de la vibora aparecera en 10 divs de donde estabas
            }
        }

        document.addEventListener('keyup', control)
        startBtn.addEventListener('click', startGame)

})