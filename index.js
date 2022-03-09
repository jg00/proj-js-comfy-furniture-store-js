// global imports - unfortunate thing when working with vanilla html and javascript in order to get same functionality there will be some copy/pasting.
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";

// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js"; // remember imports invoked right away
import display from "./src/displayProducts.js";
import { getElement } from "./src/utils.js";

const init = async () => {
  const products = await fetchProducts();

  if (products) {
    setupStore(products);
    console.log("@after setupStore(products)", store);

    const featured = store.filter((product) => product.featured);
    display(featured, getElement(".featured-center"));
  }
};

window.addEventListener("DOMContentLoaded", init);
