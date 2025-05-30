const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;
const width = Math.floor(canvas.width / box);
const height = Math.floor(canvas.height / box);

let snake;
let direction;
let food;
let score;
let game;

function drawEmoji(emoji, x, y) {
    ctx.font = `${box}px serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(emoji, x * box, y * box);
}

function drawGame() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar comida 🍖
    drawEmoji('🍖', food.x, food.y);

    // Desenhar cobra 🐌 e corpo 🐚
    snake.forEach((segment, index) => {
        if (index === 0) {
            drawEmoji('🐌', segment.x, segment.y);
        } else {
            drawEmoji('🐚', segment.x, segment.y);
        }
    });

    // Movimento
    const head = { ...snake[0] };
    if (direction === 'LEFT') head.x--;
    if (direction === 'UP') head.y--;
    if (direction === 'RIGHT') head.x++;
    if (direction === 'DOWN') head.y++;

    // Verificar colisão com parede
    if (
        head.x < 0 || head.x >= width ||
        head.y < 0 || head.y >= height
    ) {
        clearInterval(game);
        alert(`🐌 Fim de jogo! Sua pontuação: ${score}`);
        return;
    }

    // Verificar colisão com o próprio corpo
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(game);
            alert(`🐌 Fim de jogo! Sua pontuação: ${score}`);
            return;
        }
    }

    // Comer comida
    if (head.x === food.x && head.y === food.y) {
        score+=10;
        document.getElementById('score').innerText = `Pontuação: ${score}`;
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

// Controles por teclado
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Controles pelos botões na tela
function setDirection(newDirection) {
    if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
    if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
}

function restartGame() {
    snake = [{ x: 5, y: 5 }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };
    score = 0;
    document.getElementById('score').innerText = `Pontuação: ${score}`;
    clearInterval(game);
    game = setInterval(drawGame, 150);
}

restartGame();