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

  // Award XP for visiting sections (except Battlepass itself)
  if(id !== 'battlepass') addXP(10);
}

// CART SYSTEM
let cart = [];
function addToCart(item, price){
  cart.push({item, price});
  updateCart();
  addXP(5); // earn XP for ordering
}

function updateCart(){
  const cartList = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.item} - £${i.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += i.price;
  });
  totalEl.textContent = total.toFixed(2);
}

function checkout(){
  alert("Checkout complete! Points earned!");
  cart = [];
  updateCart();
}

// BATTLEPASS SYSTEM
let xp = 0;
let level = 1;
function addXP(amount){
  xp += amount;
  const xpNeeded = level * 50;
  if(xp >= xpNeeded){
    xp -= xpNeeded;
    level++;
    document.getElementById("bp-level").textContent = level;
  }
  const xpBar = document.getElementById("xp-bar");
  xpBar.style.width = Math.min((xp / (level*50))*100, 100) + "%";
}
