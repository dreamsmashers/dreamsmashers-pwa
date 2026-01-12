// RETRO GRID ANIMATION
const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");
let w, h;
function resizeCanvas(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let lines = [];
for(let i=0;i<30;i++){
  lines.push({y:i*30});
}

function drawGrid(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = '#00ffcc';
  ctx.lineWidth = 1;
  for(let i=0;i<lines.length;i++){
    lines[i].y += 2;
    if(lines[i].y > h) lines[i].y = 0;
    ctx.beginPath();
    ctx.moveTo(0, lines[i].y);
    ctx.lineTo(w, lines[i].y);
    ctx.stroke();
  }
  requestAnimationFrame(drawGrid);
}
drawGrid();

// STARFIELD
const numStars = 50;
for(let i=0;i<numStars;i++){
  let star = document.createElement("div");
  star.className="star";
  star.style.left = Math.random()*window.innerWidth+"px";
  star.style.top = Math.random()*window.innerHeight+"px";
  star.style.width = star.style.height = Math.random()*2+1+"px";
  document.body.appendChild(star);
}

// START BUTTON LOGIC
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const app = document.getElementById("app");

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display="none";
  app.hidden=false;
});

// SECTION SWITCHING
function showSection(id){
  document.querySelectorAll("main section").forEach(s=>{
    s.hidden = s.id !== id;
  });
}
