const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameButton = document.getElementById('gameButton');
const gameArea = document.getElementById('gameArea');

// Imagens
const backgroundImg = new Image();
backgroundImg.src = '2d.jpg';  // Imagem do mapa de fundo
const playerImg = new Image();
playerImg.src = 'player.png';  // Imagem do jogador

// Posição inicial do jogador
let player = { x: 50, y: 50, width: 32, height: 32 };

// Posições, dimensões e nomes dos edifícios
const buildings = {
    protocolo: { x: 150, y: 100, width: 50, height: 50, name: 'Protocolo', page: 'protocolo', color: 'rgba(255, 0, 0, 0.5)' },
    noticias: { x: 300, y: 150, width: 50, height: 50, name: 'Notícias', page: 'noticias', color: 'rgba(0, 0, 255, 0.5)' },
    editais: { x: 450, y: 200, width: 50, height: 50, name: 'Editais', page: 'editais', color: 'rgba(0, 255, 0, 0.5)' },
    educacao: { x: 600, y: 250, width: 50, height: 50, name: 'Educação', page: 'educacao', color: 'rgba(255, 165, 0, 0.5)' },
    saude: { x: 100, y: 400, width: 50, height: 50, name: 'Saúde', page: 'saude', color: 'rgba(75, 0, 130, 0.5)' },
    defesa_civil: { x: 700, y: 500, width: 50, height: 50, name: 'Defesa Civil', page: 'defesa_civil', color: 'rgba(255, 20, 147, 0.5)' }
};

// Previne a rolagem da página ao usar as setas
window.addEventListener('keydown', (e) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (keys.includes(e.key)) e.preventDefault();
    movePlayer(e.key);
});

// Exibe o jogo ao clicar no botão
gameButton.addEventListener('click', () => {
    gameArea.style.display = 'block';
    canvas.focus();
    gameLoop();
});

// Função para mover o jogador
function movePlayer(key) {
    const speed = 5;
    switch (key) {
        case 'ArrowUp':
            player.y -= speed;
            break;
        case 'ArrowDown':
            player.y += speed;
            break;
        case 'ArrowLeft':
            player.x -= speed;
            break;
        case 'ArrowRight':
            player.x += speed;
            break;
    }
    checkCollision();
}

// Verifica se o jogador colidiu com algum edifício
function checkCollision() {
    for (const building in buildings) {
        const b = buildings[building];
        if (
            player.x < b.x + b.width &&
            player.x + player.width > b.x &&
            player.y < b.y + b.height &&
            player.y + player.height > b.y
        ) {
            window.location.href = `?page=${b.page}`;
        }
    }
}

// Desenha o fundo, edifícios, nomes e o jogador
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Desenha os edifícios e seus nomes
    for (const building in buildings) {
        const b = buildings[building];
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);  // Desenha o retângulo do edifício

        // Contorno do edifício
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.width, b.height);

        // Desenha o nome do edifício
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, b.x + b.width / 2, b.y - 5);  // Nome acima do edifício
    }

    // Desenha o jogador
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Loop principal do jogo
function gameLoop() {
    drawGame();
    requestAnimationFrame(gameLoop);
}
