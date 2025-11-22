<script>
// Pipes
function createPipe() {
let gap = 140;
let topHeight = Math.random() * (H - gap - 80) + 20;
pipes.push({ x: W, top: topHeight, bottom: topHeight + gap });
}


function drawPipes() {
ctx.fillStyle = "green";
pipes.forEach(p => {
ctx.fillRect(p.x, 0, 50, p.top);
ctx.fillRect(p.x, p.bottom, 50, H - p.bottom);


if (debugToggle.checked) {
ctx.strokeStyle = "red";
ctx.strokeRect(p.x, 0, 50, p.top);
ctx.strokeRect(p.x, p.bottom, 50, H - p.bottom);
}
});
}


function updatePipes() {
pipes.forEach(p => p.x -= 2.5);
pipes = pipes.filter(p => p.x > -60);


pipes.forEach(p => {
if (!p.scored && p.x + 50 < bird.x) {
score++;
p.scored = true;
scoreEl.textContent = score;
}


if (collides(bird, p)) endGame();
});
}


// Collision
function collides(b, p) {
return (
(b.x < p.x + 50 && b.x + b.w > p.x && b.y < p.top) ||
(b.x < p.x + 50 && b.x + b.w > p.x && b.y + b.h > p.bottom)
);
}


// Game Loop
function gameLoop() {
if (!gameRunning) return;


frame++;
ctx.clearRect(0, 0, W, H);


if (frame % 90 === 0) createPipe();


drawPipes();
updatePipes();


bird.draw();
bird.update();


requestAnimationFrame(gameLoop);
}


// Game Controls
function startGame() {
gameRunning = true;
score = 0;
scoreEl.textContent = score;
pipes = [];
bird.reset();
frame = 0;
gameLoop();
}


function endGame() {
gameRunning = false;
}


restartBtn.addEventListener("click", startGame);
playBtn.addEventListener("click", () => {
document.getElementById("game").scrollIntoView({ behavior: "smooth" });
setTimeout(startGame, 400);
});


window.addEventListener("keydown", e => {
if (e.code === "Space") bird.flap();
});
window.addEventListener("mousedown", () => bird.flap());
</script>
