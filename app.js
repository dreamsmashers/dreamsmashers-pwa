// app.js

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const mainMenu = document.getElementById("main-menu");
    const sections = document.querySelectorAll(".section");
    const backButtons = document.querySelectorAll(".back-btn");

    // Start button shows main menu
    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        mainMenu.style.display = "flex";
    });

    // Menu buttons for different sections
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            sections.forEach(sec => sec.style.display = "none");
            document.getElementById(target).style.display = "block";
            mainMenu.style.display = "none";
        });
    });

    // Back buttons return to main menu
    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sections.forEach(sec => sec.style.display = "none");
            mainMenu.style.display = "flex";
        });
    });

    // Example: interactive Battle Pass
    const battlePassBtn = document.getElementById("battlepass-btn");
    const battlePassSection = document.getElementById("battlepass");
    battlePassBtn.addEventListener("click", () => {
        sections.forEach(sec => sec.style.display = "none");
        battlePassSection.style.display = "block";
    });

    // Example: events section
    const eventsBtn = document.getElementById("events-btn");
    const eventsSection = document.getElementById("events");
    eventsBtn.addEventListener("click", () => {
        sections.forEach(sec => sec.style.display = "none");
        eventsSection.style.display = "block";
    });

    // You can add other interactive sections here the same way
});
