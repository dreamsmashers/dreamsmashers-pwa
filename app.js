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

  // Award XP for visiting sections (except Battlepass)
  if(id !== 'battlepass') addXP(10);

  createParticlesForSection(id);
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

// BATTLEPASS XP SYSTEM
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

// NEON PARTICLE EFFECT PER SECTION
function createParticlesForSection(id){
  const section = document.getElementById(id);
  // Remove old particles
  section.querySelectorAll(".neon-particle").forEach(p => p.remove());
  for(let i=0;i<50;i++){
    const p = document.createElement("div");
    p.className = "neon-particle";
    p.style.left = Math.random()*section.offsetWidth+"px";
    p.style.top = Math.random()*section.offsetHeight+"px";
    section.appendChild(p);
  }
}
