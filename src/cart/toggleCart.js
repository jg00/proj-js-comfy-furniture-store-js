/*
  Note: this page is used globally for every page
*/

import { getElement } from "../utils.js";

const cartOverlay = getElement(".cart-overlay");
const toggleCartBtn = getElement(".toggle-cart");
const closeCartBtn = getElement(".cart-close");

toggleCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});

closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

// feature - programatically open cart when magnifying glass on product clicked on any page
// Used in cart/setupCart.js
export const openCart = () => {
  cartOverlay.classList.add("show");
};
