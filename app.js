// CREATE STARFIELD
const numStars = 100;
for(let i=0; i<numStars; i++){
  let star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.animationDuration = 2 + Math.random()*3 + "s";
  document.body.appendChild(star);
}
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const app = document.getElementById("app");

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  app.hidden = false;
});

function showSection(id) {
  document.querySelectorAll("main section").forEach(section => {
    section.hidden = section.id !== id;
  });
}
