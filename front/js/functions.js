async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  return response.json();
}


/**
 * Retourne un objet produit à partir de son identifiant
 * @param {string} id
 * @returns {Promise(Object)}
 */
async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return response.json();
}
/**
 * Retourne une valeur passée dans l'url à partir de sa clé
 * @param {string} key
 * @returns {string}
 */
function getKeyInUrl(key) {
  const url = new URL(window.location.href);
  const value = url.searchParams.get(key);
  return value;
}

function getProductFromLocalStorage() {
  const storageContent = localStorage.getItem("basket");
  const products = JSON.parse(storageContent);
  return products;
}
/**
 * Recherche et retourne un index du tableau de produit à partir d'un id et une couleur
 * @param {Object[]} products
 * @param {string} id
 * @param {string} color
 * @returns {number}
 */
function findProductByIdAndColor(products, id, color) {
  const productIndex = products.findIndex(function (product) {
    if (product._id === id && product.color === color) {
      return true;
    } else {
      return false;
    }
  });
  return productIndex;
}
