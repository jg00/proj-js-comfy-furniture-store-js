import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const form = getElement(".input-form");
  const nameInput = getElement(".search-input");

  form.addEventListener("keyup", function () {
    const value = nameInput.value.toLowerCase();

    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        console.log(name);
        return name.includes(value);
      });
      display(newStore, getElement(".products-container"), true);

      // no products returned by entered value
      if (newStore.length < 1) {
        const products = getElement(".products-container");
        products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
      }
    } else {
      // handle empty string
      display(store, getElement(".products-container"), true); // scenario - as you are filtering we need to display all as we return search text value back to empty string/default
    }
  });
};

export default setupSearch;
