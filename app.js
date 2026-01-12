// =======================
// SECTION SWITCHING LOGIC
// =======================
function hideAllSections() {
  document.querySelectorAll('section').forEach(sec => sec.hidden = true);
}

document.getElementById("start-button").addEventListener("click", () => {
  hideAllSections();
  document.getElementById("menu").hidden = false;
  showMenuModal();
});

// =======================
// MENU MODAL
// =======================
function showMenuModal() {
  const modal = document.getElementById("menu-modal");
  modal.style.display = "flex";
}
document.getElementById("menu-modal-close").addEventListener("click", () => {
  document.getElementById("menu-modal").style.display = "none";
});

// =======================
// SKYRIM-STYLE CART LOGIC
// =======================
let cart = [];
let cartTotal = 0;

function addToCart(itemName, price) {
  cart.push({name: itemName, price: price});
  cartTotal += price;
  updateCartUI();
}

function removeFromCart(index) {
  cartTotal -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cart
