document.addEventListener('DOMContentLoaded', () => {

    // Opening Screen
    const openingScreen = document.getElementById('opening-screen');
    const pressStartBtn = document.getElementById('press-start');
    const mainPage = document.getElementById('main-page');
    const fallingContainer = document.getElementById('falling-sprites');

    let spriteInterval = null;

    pressStartBtn.addEventListener('click', () => {
        // Stop falling animation
        if (spriteInterval) clearInterval(spriteInterval);
        fallingContainer.innerHTML = '';

        // Transition screens
        openingScreen.classList.add('hidden');
        mainPage.classList.remove('hidden');
    });

    // Falling Sprites (ONLY on opening screen)
    function spawnFallingSprites() {
        spriteInterval = setInterval(() => {
            const sprite = document.createElement('div');
            sprite.style.position = 'absolute';
            sprite.style.left = Math.random() * 100 + '%';
            sprite.style.top = '-30px';
            sprite.style.width = '20px';
            sprite.style.height = '20px';
            sprite.style.background = '#0ff';
            sprite.style.opacity = '0.8';

            fallingContainer.appendChild(sprite);

            let y = -30;
            const fall = setInterval(() => {
                y += 2;
                sprite.style.top = y + 'px';

                if (y > window.innerHeight) {
                    clearInterval(fall);
                    sprite.remove();
                }
            }, 16);
        }, 250);
    }

    spawnFallingSprites();

    // Menu Handling
    const icons = document.querySelectorAll('.icon');
    const menuDisclaimer = document.getElementById('menu-disclaimer');
    const agreeBtn = document.getElementById('agree-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    let pendingMenu = null;

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const menu = icon.dataset.menu;
            if (menu === 'drinks' || menu === 'food') {
                pendingMenu = menu;
                menuDisclaimer.classList.remove('hidden');
            } else {
                openPanel(menu);
            }
        });
    });

    agreeBtn.addEventListener('click', () => {
        menuDisclaimer.classList.add('hidden');
        openPanel(pendingMenu);
        pendingMenu = null;
    });

    cancelBtn.addEventListener('click', () => {
        menuDisclaimer.classList.add('hidden');
        pendingMenu = null;
    });

    function openPanel(panel) {
        document.querySelectorAll(
            '.menu-panel, #events-panel, #battlepass-panel, #nutrients-panel, #allergens-panel'
        ).forEach(p => p.classList.add('hidden'));

        const map = {
            drinks: 'drinks-menu',
            food: 'food-menu',
            events: 'events-panel',
            battlepass: 'battlepass-panel',
            nutrients: 'nutrients-panel',
            allergens: 'allergens-panel'
        };

        const target = document.getElementById(map[panel]);
        if (target) target.classList.remove('hidden');
    }

});
