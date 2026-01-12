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
