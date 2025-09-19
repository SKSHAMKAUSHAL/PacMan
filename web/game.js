// Pac-Man Web Game - Ported from Java Swing version
class PacManGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game dimensions
        this.rowCount = 21;
        this.columnCount = 19;
        this.tileSize = 32;
        this.boardWidth = this.columnCount * this.tileSize;
        this.boardHeight = this.rowCount * this.tileSize;
        
        // Game state
        this.score = 0;
        this.lives = 3;
        this.highScore = parseInt(localStorage.getItem('pacmanHighScore')) || 0;
        this.gameOver = false;
        
        // Game objects
        this.walls = [];
        this.foods = [];
        this.ghosts = [];
        this.pacman = null;
        
        // Game map (same as Java version)
        this.tileMap = [
            "XXXXXXXXXXXXXXXXXXX",
            "X        X        X",
            "X XX XXX X XXX XX X",
            "X                 X",
            "X XX X XXXXX X XX X",
            "X    X       X    X",
            "XXXX XXXX XXXX XXXX",
            "OOOX X       X XOOO",
            "XXXX X XXrXX X XXXX",
            "O       bpo       O",
            "XXXX X XXXXX X XXXX",
            "OOOX X       X XOOO",
            "XXXX X XXXXX X XXXX",
            "X        X        X",
            "X XX XXX X XXX XX X",
            "X  X     P     X  X",
            "XX X X XXXXX X X XX",
            "X    X   X   X    X",
            "X XXXXXX X XXXXXX X",
            "X                 X",
            "XXXXXXXXXXXXXXXXXXX"
        ];
        
        // Movement directions
        this.directions = ['U', 'D', 'L', 'R'];
        
        // Initialize game
        this.loadImages().then(() => {
            this.loadMap();
            this.startGameLoop();
            this.setupControls();
            this.updateUI();
        });
    }
    
    async loadImages() {
        // Create colored rectangles for game elements since we can't load the PNG files directly
        this.images = {
            wall: this.createColorRect('#0000FF', this.tileSize, this.tileSize),
            pacmanRight: this.createPacman('#FFFF00', 'right'),
            pacmanLeft: this.createPacman('#FFFF00', 'left'),
            pacmanUp: this.createPacman('#FFFF00', 'up'),
            pacmanDown: this.createPacman('#FFFF00', 'down'),
            blueGhost: this.createGhost('#00FFFF'),
            orangeGhost: this.createGhost('#FFA500'),
            pinkGhost: this.createGhost('#FFB6C1'),
            redGhost: this.createGhost('#FF0000')
        };
    }
    
    createColorRect(color, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return canvas;
    }
    
    createPacman(color, direction) {
        const canvas = document.createElement('canvas');
        canvas.width = this.tileSize;
        canvas.height = this.tileSize;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        ctx.beginPath();
        
        const centerX = this.tileSize / 2;
        const centerY = this.tileSize / 2;
        const radius = this.tileSize / 2 - 2;
        
        let startAngle, endAngle;
        switch(direction) {
            case 'right':
                startAngle = 0.2 * Math.PI;
                endAngle = 1.8 * Math.PI;
                break;
            case 'left':
                startAngle = 1.2 * Math.PI;
                endAngle = 0.8 * Math.PI;
                break;
            case 'up':
                startAngle = 1.7 * Math.PI;
                endAngle = 1.3 * Math.PI;
                break;
            case 'down':
                startAngle = 0.7 * Math.PI;
                endAngle = 0.3 * Math.PI;
                break;
        }
        
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        
        return canvas;
    }
    
    createGhost(color) {
        const canvas = document.createElement('canvas');
        canvas.width = this.tileSize;
        canvas.height = this.tileSize;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.tileSize/2, this.tileSize/2, this.tileSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(8, 10, 6, 8);
        ctx.fillRect(18, 10, 6, 8);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 12, 2, 4);
        ctx.fillRect(20, 12, 2, 4);
        
        return canvas;
    }
    
    loadMap() {
        this.walls = [];
        this.foods = [];
        this.ghosts = [];
        
        for (let r = 0; r < this.rowCount; r++) {
            for (let c = 0; c < this.columnCount; c++) {
                const tileMapChar = this.tileMap[r].charAt(c);
                const x = c * this.tileSize;
                const y = r * this.tileSize;
                
                switch(tileMapChar) {
                    case 'X':
                        this.walls.push({x, y, width: this.tileSize, height: this.tileSize});
                        break;
                    case 'b':
                        this.ghosts.push({
                            x, y, startX: x, startY: y,
                            width: this.tileSize, height: this.tileSize,
                            direction: 'U', velocityX: 0, velocityY: -this.tileSize/4,
                            color: 'blue'
                        });
                        break;
                    case 'o':
                        this.ghosts.push({
                            x, y, startX: x, startY: y,
                            width: this.tileSize, height: this.tileSize,
                            direction: 'U', velocityX: 0, velocityY: -this.tileSize/4,
                            color: 'orange'
                        });
                        break;
                    case 'p':
                        this.ghosts.push({
                            x, y, startX: x, startY: y,
                            width: this.tileSize, height: this.tileSize,
                            direction: 'U', velocityX: 0, velocityY: -this.tileSize/4,
                            color: 'pink'
                        });
                        break;
                    case 'r':
                        this.ghosts.push({
                            x, y, startX: x, startY: y,
                            width: this.tileSize, height: this.tileSize,
                            direction: 'U', velocityX: 0, velocityY: -this.tileSize/4,
                            color: 'red'
                        });
                        break;
                    case 'P':
                        this.pacman = {
                            x, y, startX: x, startY: y,
                            width: this.tileSize, height: this.tileSize,
                            direction: 'R', velocityX: 0, velocityY: 0
                        };
                        break;
                    case ' ':
                        this.foods.push({
                            x: x + 14, y: y + 14,
                            width: 4, height: 4
                        });
                        break;
                }
            }
        }
        
        // Initialize ghost directions randomly
        this.ghosts.forEach(ghost => {
            const newDirection = this.directions[Math.floor(Math.random() * 4)];
            this.updateDirection(ghost, newDirection);
        });
    }
    
    updateDirection(entity, direction) {
        const prevDirection = entity.direction;
        entity.direction = direction;
        this.updateVelocity(entity);
        
        // Check for wall collision
        entity.x += entity.velocityX;
        entity.y += entity.velocityY;
        
        for (const wall of this.walls) {
            if (this.collision(entity, wall)) {
                entity.x -= entity.velocityX;
                entity.y -= entity.velocityY;
                entity.direction = prevDirection;
                this.updateVelocity(entity);
                break;
            }
        }
    }
    
    updateVelocity(entity) {
        switch(entity.direction) {
            case 'U':
                entity.velocityX = 0;
                entity.velocityY = -this.tileSize/4;
                break;
            case 'D':
                entity.velocityX = 0;
                entity.velocityY = this.tileSize/4;
                break;
            case 'L':
                entity.velocityX = -this.tileSize/4;
                entity.velocityY = 0;
                break;
            case 'R':
                entity.velocityX = this.tileSize/4;
                entity.velocityY = 0;
                break;
        }
    }
    
    collision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
    
    move() {
        if (this.gameOver) return;
        
        // Move Pac-Man
        this.pacman.x += this.pacman.velocityX;
        this.pacman.y += this.pacman.velocityY;
        
        // Check wall collisions for Pac-Man
        for (const wall of this.walls) {
            if (this.collision(this.pacman, wall)) {
                this.pacman.x -= this.pacman.velocityX;
                this.pacman.y -= this.pacman.velocityY;
                break;
            }
        }
        
        // Move ghosts
        this.ghosts.forEach(ghost => {
            // Special behavior for ghosts at y = tileSize * 9
            if (ghost.y === this.tileSize * 9 && ghost.direction !== 'U' && ghost.direction !== 'D') {
                this.updateDirection(ghost, 'U');
            }
            
            ghost.x += ghost.velocityX;
            ghost.y += ghost.velocityY;
            
            // Check wall collisions for ghosts
            for (const wall of this.walls) {
                if (this.collision(ghost, wall) || ghost.x <= 0 || ghost.x + ghost.width >= this.boardWidth) {
                    ghost.x -= ghost.velocityX;
                    ghost.y -= ghost.velocityY;
                    const newDirection = this.directions[Math.floor(Math.random() * 4)];
                    this.updateDirection(ghost, newDirection);
                    break;
                }
            }
            
            // Check ghost-pacman collision
            if (this.collision(ghost, this.pacman)) {
                this.lives--;
                if (this.lives === 0) {
                    this.gameOver = true;
                    this.updateUI();
                    return;
                }
                this.resetPositions();
            }
        });
        
        // Check food collision
        for (let i = this.foods.length - 1; i >= 0; i--) {
            if (this.collision(this.pacman, this.foods[i])) {
                this.foods.splice(i, 1);
                this.score += 10;
                this.highScore = Math.max(this.score, this.highScore);
                localStorage.setItem('pacmanHighScore', this.highScore.toString());
            }
        }
        
        // Check if all food eaten
        if (this.foods.length === 0) {
            this.loadMap();
            this.resetPositions();
        }
        
        this.updateUI();
    }
    
    resetPositions() {
        this.pacman.x = this.pacman.startX;
        this.pacman.y = this.pacman.startY;
        this.pacman.velocityX = 0;
        this.pacman.velocityY = 0;
        
        this.ghosts.forEach(ghost => {
            ghost.x = ghost.startX;
            ghost.y = ghost.startY;
            const newDirection = this.directions[Math.floor(Math.random() * 4)];
            this.updateDirection(ghost, newDirection);
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);
        
        // Draw Pac-Man
        const pacmanImage = this.images[`pacman${this.pacman.direction === 'U' ? 'Up' : 
                                                this.pacman.direction === 'D' ? 'Down' :
                                                this.pacman.direction === 'L' ? 'Left' : 'Right'}`];
        this.ctx.drawImage(pacmanImage, this.pacman.x, this.pacman.y);
        
        // Draw ghosts
        this.ghosts.forEach(ghost => {
            const ghostImage = this.images[`${ghost.color}Ghost`];
            this.ctx.drawImage(ghostImage, ghost.x, ghost.y);
        });
        
        // Draw walls
        this.walls.forEach(wall => {
            this.ctx.drawImage(this.images.wall, wall.x, wall.y);
        });
        
        // Draw food
        this.ctx.fillStyle = '#FFFFFF';
        this.foods.forEach(food => {
            this.ctx.fillRect(food.x, food.y, food.width, food.height);
        });
    }
    
    updateUI() {
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        
        const gameOverMsg = document.getElementById('gameOverMessage');
        if (this.gameOver) {
            gameOverMsg.style.display = 'block';
        } else {
            gameOverMsg.style.display = 'none';
        }
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) {
                if (e.code === 'Space') {
                    this.restartGame();
                }
                return;
            }
            
            switch(e.code) {
                case 'ArrowUp':
                    this.updateDirection(this.pacman, 'U');
                    break;
                case 'ArrowDown':
                    this.updateDirection(this.pacman, 'D');
                    break;
                case 'ArrowLeft':
                    this.updateDirection(this.pacman, 'L');
                    break;
                case 'ArrowRight':
                    this.updateDirection(this.pacman, 'R');
                    break;
            }
            e.preventDefault();
        });
    }
    
    restartGame() {
        this.loadMap();
        this.resetPositions();
        this.lives = 3;
        this.highScore = Math.max(this.score, this.highScore);
        this.score = 0;
        this.gameOver = false;
        this.updateUI();
        localStorage.setItem('pacmanHighScore', this.highScore.toString());
    }
    
    startGameLoop() {
        const gameLoop = () => {
            this.move();
            this.draw();
            setTimeout(gameLoop, 50); // 20 FPS (same as Java version)
        };
        gameLoop();
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    new PacManGame();
});
