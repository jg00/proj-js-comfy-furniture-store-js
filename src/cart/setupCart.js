/*
  Note: this page is used globally for every page

  cart:
  1 data side cart array synchronized with localStorage
  2 DOM side that needs to be synchronized with the cart data
*/

import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";

// Remember these items are available to all pages via import.
// Update from localStorage on every page refresh via init() function.
const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items"); // parent element
const cartTotalDOM = getElement(".cart-total");
// console.log("@setupCart available to all pages: ", cartItemCountDOM, cartItems);

// set up cart - returns [] if not found
let cart = getStorageItem("cart");

// called at three places - homepage card button, products page car button, and single product page add to cart button.
export const addToCart = (id) => {
  // console.log("@setupCart addToCart:", id);

  // This if statement is all about updating the cart data
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    // add product to the cart
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];

    // add to the cart DOM list
    addToCartDOM(product);
  } else {
    // Update cart data. Purpose of getting amount back is so we can use it to update the cart DOM.
    const amount = increaseAmount(id);

    // Update cart DOM. newAmount is the specific element.
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }

  // At this point cart data has been updated and we can use toward calcaulations below
  // add one to the item count
  displayCartItemCount();

  // display cart totals
  displayCartTotal();

  // Set cart in local storage. Purpose is to synchronize the local storage get updated values as we navigate from page to page or refresh the site.
  setStorageItem("cart", cart);

  openCart(); // when clicking on the add to cart icon from featured or product list or any other add to cart buttons on any page.
};

// Affect cart data only. Called within addToCart() however we also want to call when the page is loaded to initialize calculations from storage
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return total + cartItem.amount;
  }, 0);

  cartItemCountDOM.textContent = amount;
}

// Affect cart data only. Called within addToCart() however we also want to call when the page is loaded and setupCart.js is imported to initialize calculations from storage
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return total + cartItem.amount * cartItem.price;
  }, 0);

  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
}

// Use cart data. Only called on page load to display cart based on cart in local storage
function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

// Affect cart data only. Remove item from the cart only
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

// Affect cart data only. Update our cart data and return new amount value to update our cart DOM
function increaseAmount(id) {
  let newAmount; // will be used to update cart DOM

  // cart data
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  console.log("@increaseAmount", cart);

  return newAmount;
}

// Affect cart data only. Update our cart data and return new amount value to update our cart DOM
function decreaseAmount(id) {
  let newAmount; // will be used to update cart DOM

  // cart data
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  console.log("@decreaseAmount", cart);

  return newAmount;
}

// Affect cart data and DOM. Remove, Increase, Decrease button events.
function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = element.dataset.id;
    const parentID = parent.dataset.id;

    // Remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id); // removes item from the cart only
      parent.parentElement.remove(); // remove article from the cart DOM
    }

    // Increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID); // update item amount from the cart only
      parent.nextElementSibling.textContent = newAmount; // update the cart DOM
    }

    // Decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID); // update item amount from the cart only
      if (newAmount === 0) {
        removeItem(parentID); // affect cart data
        parent.parentElement.parentElement.remove(); // auto remove item from cart DOM
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    // At this point cart data has been updated and we can use toward calcaulations below
    // Functions to run regardless if we are removing item, increasing/decreasing amount.
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

// Run this function everytime we import this setupCart module (ie on every page and/or refresh of any page)
const init = () => {
  console.log("@setupCart cart:", cart);
  displayCartItemCount();
  displayCartTotal();

  // add all cart items to the DOM
  displayCartItemsDOM();

  // Setup cart functionality.  Register event listener.
  setupCartFunctionality();
};
init();

/* addToCart()
  // Find if item is already in the cart.  
  - If not then find the product from store
  - Include quantity property with value of one
  - Add to the cart
  - Update the cart DOM with the specific product
  
  - displayCartItemCount()
  - displayCartTotal()
  - setStorageItem()
*/
