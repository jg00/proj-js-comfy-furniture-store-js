import { getStorageItem, setStorageItem } from "./utils.js";

// getStorageItem called on every other page other than index.html
// let store = [];
let store = getStorageItem("store"); // this gets invoked 1. in the index.js via import but 2. setupStore also gets run one more time (both only at index.js)

// Massage each product data and store only fields we need
// setupStore only called once in the index.html/index.js
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, price, name, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, featured, price, name, company, colors, image };
  });

  // Purpose is to be able to access the data from any page when directed to them.
  setStorageItem("store", store);
};

console.log("@import from store.js", store);

// Used when trying to add item to the cart
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

export { store, setupStore, findProduct };

/*
// Alternative export syntax
export let store
export const setupStore
export const findProduct
*/
