// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID; // initially undefined in this global context until set below when DOM content is loaded.

// show product when page loads - network error vs no product found error
window.addEventListener("DOMContentLoaded", async function () {
  const urlID = window.location.search;
  // const urlID = "id=hello"; // product not found error vs network error

  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      console.log("found single product: ", product);

      // massage data
      const { id, fields } = product;
      productID = id; // using id from the fetched data instead of setting as data-id on the button
      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;

      // set values
      document.title = `${name.toUpperCase()} | Comfy`; // page title
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      colors.forEach((color) => {
        const spanEl = document.createElement("span");
        spanEl.classList.add("product-color");
        spanEl.style.background = `${color}`;
        colorsDOM.appendChild(spanEl);
      });
    } else {
      console.log(
        "product search error:",
        response.status,
        response.statusText
      );
      centerDOM.innerHTML = `<div>
      <h3 class="error">sorry, something went wrong - no product found</h3>
      <a href="index.html" class="btn">back home</a>
      </div>`;
    }
  } catch (error) {
    console.log("network error:", error);
  }

  loading.style.display = "none";
});

// add to cart; note that DOMContentLoaded event has already fired before btn event listener below and that is why we have access to productID
cartBtn.addEventListener("click", function () {
  addToCart(productID);
});

/*
Alternative
let productID = new URLSearchParams(document.location.search).get('id')
console.log(productID)
*/
