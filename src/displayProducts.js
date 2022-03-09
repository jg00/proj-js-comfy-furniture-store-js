import { formatPrice } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";

const display = (products, element, filters) => {
  const displayItems = products
    .map((product) => {
      const { id, image, name, price } = product;

      return `
      <article class="product">
        <div class="product-container">
          <img
            src="${image}"
            alt="${name}"
            class="product-img img"
          />
          <div class="product-icons">
            <a href="product.html?id=${id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>

        <footer>
          <p class="product-name">${name}</p>
          <h4 class="product-price">${formatPrice(price)}</h4>
        </footer>
      </article>
    `;
    })
    .join("");

  element.innerHTML = displayItems;

  // FIX - Prevent multiple registration of event below when clicking on filters.
  if (filters) return;

  // Use event bubbling
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement;

    if (parent.classList.contains("product-cart-btn")) {
      addToCart(parent.dataset.id);
    }
  });
};

export default display;

/*
ISSUE:
displayProduct.js is imported and called from every filter (ie companies.js, price.js, search.js)
When this happens the event listener is registered multiple times.
Now when we click on icon to add a product all the events fire causing multiple items to be added to the cart.

FIX:
Add 'filters' param.  Purpose is to check if it is filters that is calling this function then we 
simple return from the function to prevent the events from being registered.

If we are calling filters we are already working on the products page.  If we are on the products page then
the event listener is 'already' registered when we navigate to the products page because displayProducts.js is
imported from products.js.

Having the 'filters' argument will prevent the events from beign registered if displayProducts.js is being imported
and called from one of those filter .js code.
*/
