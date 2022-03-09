// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

//  filter imports
import setupSearch from "../filters/search.js";
import setupCompanies from "../filters/companies.js";
import setupPrice from "../filters/price.js";

// specific imports
import { store } from "../store.js";
import display from "../displayProducts.js";
import { getElement } from "../utils.js";

const loading = getElement(".page-loading");

display(store, getElement(".products-container")); // on products page load display all products

// Note filtering in this project is not combined
setupSearch(store);
setupCompanies(store);
setupPrice(store);

loading.style.display = "none";
