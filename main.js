const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let tubeInterval = 200;  
let tubeGenerationInterval = 1900;
let gameInterval;
let start = false;
let totalPt = 0;
let tubes = [];
let baseLength = 1;

let background = new Background(1);
let bird = new Bird(100, 100);

document.getElementById('easy').addEventListener('click', () => setupGame(300, 2000, 0.5));
document.getElementById('medium').addEventListener('click', () => setupGame(200, 1000, 1));
document.getElementById('hard').addEventListener('click', () => setupGame(100, 500, 1.3));

function setupGame(interval, tubeGenerationInterval, length) {
    // I learned how to use the interval from chatgpt so this is stopping generating tubes
    clearInterval(gameInterval);
    totalPt = 0;
    tubeInterval = interval;
    baseLength = length;
    bird = new Bird(100, 100); 
    tubes = generateTube(canvas.width);
    gameInterval = setInterval(addTube, tubeGenerationInterval);// and this is starting to generate the tube and return the interval id as gameInterval for resetting action
    if (!start) {
        start = true;
        animate();
    }
}

canvas.addEventListener('click', function(e) {
    if (!start) {
        setupGame(200, 1000, 1); 
    } else {
        const rect = canvas.getBoundingClientRect();
        //cgatgpt helped debuggin here apparently i need to subtract the rect.left and rect.top from the clientX and clientY to get the correct position of the click
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        bird.setPath({ x: clickX, y: clickY });
    }
});

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.height + rect1.y > rect2.y ||
           rect1.y < 0 || rect1.y > canvas.height || rect1.x < 0 || rect1.x > canvas.width;
}

function generateTube(x) {
    let newTube = [];
    for (let i = 0; i < 2; i++) {
        let length = Math.random() * 0.5 + baseLength; 
        let y = (i % 2 === 0) ? 0 : canvas.height - (64 * length);
        newTube.push(new Tube(x, y, length));
    }
    return newTube;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText("Click to start", 10, 50);
    ctx.font = "15px Arial";
    if (!start) return;
    
    background.update();
    background.draw(ctx);
    let totTube = tubes.length;
    tubes = tubes.filter(tube => tube.active);
    totalPt += totTube - tubes.length;
    
    tubes.forEach(tube => {
        tube.update();
        tube.draw(ctx);
        if (checkCollision({x: bird.position.x, y: bird.position.y, width: bird.width, height: bird.height}, 
                           {x: tube.x, y: tube.y, width: tube.width, height: tube.height})) {
            start = false;
            clearInterval(gameInterval);
            alert('Game Over, your score is ' + totalPt/2 + ' points!');
            return;
        }
    });
    bird.updatePosition();
    bird.draw(ctx);
    requestAnimationFrame(animate);
}
function addTube() {
    let lastTubeX = tubes.length > 0 ? tubes[tubes.length - 1].x : canvas.width;
    tubes.push(...generateTube(lastTubeX +tubeInterval));
    
}

animate();