// Contient l'objet produit de la page en cours
let currentProduct;

// Ajout d'une action au clic sur le bouton ajouter au panier
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", addToCart);

/**
 * Retourne un objet produit à partir de son identifiant
 * @param {string} id
 * @returns {Promise<Object>}
 */
 async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return response.json();
}

/**
 * Affiche les détails du produit sur la page produit
 * @param {object} product
 * @returns {void}
 */
function displaySingleProduct(product) {
  if (!Object.keys(product).length) {
    return;
  }
  const elTitle = document.getElementById("title");
  const elPrice = document.getElementById("price");
  const elDescription = document.getElementById("description");
  const elColor = document.getElementById("colors");
  const elImgContainer = document.querySelector(".item__img");
  const elImg = new Image();
  elImg.src = product.imageUrl;
  elImg.alt = product.altTxt;
  elImgContainer.appendChild(elImg);
  elTitle.innerText = product.name;
  elPrice.innerText = product.price + " ";
  elDescription.innerText = product.description;
  for (const color of product.colors) {
    const option = new Option(color, color);
    elColor.options[elColor.options.length] = option;
  }
}

/**
 * Ajoute le produit de la page en cour au panier en fonction d'une couleur et d'une quantité
 * @returns {void}
 */
function addToCart() {
  const product = currentProduct;
  if (!Object.keys(product).length) {
    alert("Produit inexistant");
    return;
  }

  const elColor = document.getElementById("colors");
  const color = elColor.value;
  if (!color) {
    alert("Vous devez selectionner une couleur");
    return;
  }

  const elQuantity = document.getElementById("quantity");
  const quantity = elQuantity.value;
  if (quantity < 1) {
    alert("Vous devez selectionner une quantité");
    return;
  }

  let basket = localStorage.getItem("basket");
  if (!basket) {
    basket = [];
  } else {
    basket = JSON.parse(basket);
  }

  const findIndex = findProductByIdAndColor(basket, product._id, color);
  if (findIndex > -1) {
    // Modification de la quantité d'un produit déja existant
    const existProduct = basket[findIndex];
    basket[findIndex].qty = parseInt(existProduct.qty) + parseInt(quantity);
    alert("La quantité de produit " + existProduct.name + " à été augmentée");
  } else {
    // Ajout d'un nouveau produit dans le panier
    const basketItem = {
      _id: product._id,
      color: color,
      qty: parseInt(quantity),
      name: product.name,
      imageUrl: product.imageUrl,
      altTxt: product.altTxt,
    };
    basket.push(basketItem)
    alert("Le produit " + product.name + " a été ajouté")
  }
  localStorage.setItem("basket", JSON.stringify(basket))
}

/**
 * Récupère un produit à partir de son id dans l'url et l'affiche sur la page
 * @returns {Promise<void>}
 */
async function getProductById() {
  const id = getKeyInUrl("id")
  currentProduct = await getProduct(id)
  displaySingleProduct(currentProduct)
}

getProductById();
