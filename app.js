// Opening Screen
const openingScreen = document.getElementById('opening-screen');
const pressStartBtn = document.getElementById('press-start');
const mainPage = document.getElementById('main-page');

pressStartBtn.addEventListener('click', () => {
    openingScreen.classList.add('hidden');
    mainPage.classList.remove('hidden');
    spawnFallingSprites();
});

// Falling Sprites
function spawnFallingSprites() {
    const container = document.getElementById('falling-sprites');
    setInterval(() => {
        const sprite = document.createElement('div');
        sprite.classList.add('sprite');
        sprite.style.position = 'absolute';
        sprite.style.left = Math.random() * 100 + '%';
        sprite.style.top = '-20px';
        sprite.style.width = '20px';
        sprite.style.height = '20px';
        sprite.style.background = 'cyan';
        container.appendChild(sprite);
        let top = -20;
        const fall = setInterval(() => {
            top += 2;
            sprite.style.top = top + 'px';
            if(top > window.innerHeight) {
                clearInterval(fall);
                sprite.remove();
            }
        }, 30);
    }, 300);
}

// Menu Handling
const icons = document.querySelectorAll('.icon');
const menuDisclaimer = document.getElementById('menu-disclaimer');
const agreeBtn = document.getElementById('agree-btn');
const cancelBtn = document.getElementById('cancel-btn');
let pendingMenu = null;

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const menu = icon.dataset.menu;
        if(menu === 'drinks' || menu === 'food'){
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

function openPanel(panel){
    // Hide all panels
    document.querySelectorAll('.menu-panel, #events-panel, #battlepass-panel, #nutrients-panel, #allergens-panel').forEach(p => p.classList.add('hidden'));
    // Show selected
    switch(panel){
        case 'drinks': document.getElementById('drinks-menu').classList.remove('hidden'); loadDrinks(); break;
        case 'food': document.getElementById('food-menu').classList.remove('hidden'); loadFood(); break;
        case 'events': document.getElementById('events-panel').classList.remove('hidden'); loadEvents(); break;
        case 'battlepass': document.getElementById('battlepass-panel').classList.remove('hidden'); loadBattlePass(); break;
        case 'nutrients': document.getElementById('nutrients-panel').classList.remove('hidden'); loadNutrients(); break;
        case 'allergens': document.getElementById('allergens-panel').classList.remove('hidden'); loadAllergens(); break;
    }
}

// Cart
let cart = [];
let cartLevelXP = 100;
let userXP = 0;

const cartIcon = document.getElementById('cart-icon');
const cartPanel = document.getElementById('cart-panel');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const cartClose = document.getElementById('cart-close');
const cartTrash = document.getElementById('cart-trash');

cartIcon.addEventListener('click', () => { cartPanel.classList.toggle('hidden'); });
cartClose.addEventListener('click', () => { cartPanel.classList.add('hidden'); });

// Add to Cart Function
function addToCart(item){
    let existing = cart.find(i => i.name === item.name);
    if(existing){ existing.qty++; } else { cart.push({...item, qty:1}); }
    updateCart();
    gainXPFromPurchase(item.price);
}

// Update Cart Display
function updateCart(){
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(i => {
        total += i.price*i.qty;
        const div = document.createElement('div');
        div.textContent = `${i.name} x${i.qty} - £${i.price*i.qty}`;
        div.draggable = true;
        div.addEventListener('dragstart', (e)=>{ e.dataTransfer.setData('text/plain', i.name); });
        cartItemsDiv.appendChild(div);
    });
    cartTotalDiv.textContent = `Total: £${total}`;
}

// Trash Handling
cartTrash.addEventListener('dragover', e=>e.preventDefault());
cartTrash.addEventListener('drop', e=>{
    const name = e.dataTransfer.getData('text/plain');
    cart = cart.filter(i=>i.name!==name);
    updateCart();
});

// XP Handling
function gainXPFromPurchase(price){
    let xpGained = price * 0.25 * 10; // 25% of purchase as XP
    userXP += xpGained;
    updateXPBar();
}

// XP Bar Update
function updateXPBar(){
    const xpFill = document.getElementById('xp-fill');
    const xpTooltip = document.getElementById('xp-tooltip');
    let percent = Math.min((userXP/cartLevelXP)*100, 100);
    xpFill.style.width = percent+'%';
    xpTooltip.textContent = `Level: ${Math.floor(userXP/cartLevelXP)+1} - XP: ${Math.floor(userXP)}/${cartLevelXP}`;
}

// Placeholder Functions for Menus & Events
function loadDrinks(){ document.getElementById('drinks-menu').innerHTML = '<p>Drinks menu items go here</p>'; }
function loadFood(){ document.getElementById('food-menu').innerHTML = '<p>Food menu items go here</p>'; }
function loadEvents(){ document.getElementById('events-panel').innerHTML = '<p>Events go here</p>'; }
function loadBattlePass(){ document.getElementById('rewards-grid').innerHTML = '<p>Battle Pass rewards go here</p>'; }
function loadNutrients(){ document.getElementById('nutrients-panel').innerHTML = '<p>Nutrients info here</p>'; }
function loadAllergens(){ document.getElementById('allergens-panel').innerHTML = '<p>Allergens info here</p>'; }
