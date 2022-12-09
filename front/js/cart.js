function changeProductQuantity(event) {
  const el = event.target;
  const parent = el.closest("article");
  const productId = parent.dataset.id;
  const productColor = parent.dataset.color;
  const qty = el.value;
  const elPrice = parent.querySelector(
    ".cart__item__content__description p:nth-child(3)"
  );

  // Recherche du produit, ayant pour id productId et couleur productColor
  const products = getProductFromLocalStorage();
  const productIndex = findProductByIdAndColor(
    products,
    productId,
    productColor
  );

  //Mise à jour de la quantité de produits
  if (productIndex > -1) {
    products[productIndex].qty = parseInt(qty);
    elPrice.innerHTML = qty * products[productIndex].price + ` &euro;`;
  }

  localStorage.setItem("basket", JSON.stringify(products));
  setTotalQuantityProduct(products);
  displayTotalPrice(products);
}

function displayTotalPrice(products) {
  let total = 0;
  //Calcul du prix total
  for (const product of products) {
    const price = product.price * product.qty;
    total += price;
  }

  const elTotalPrice = document.getElementById("totalPrice");
  elTotalPrice.innerText = total;
}

function deleteCartProduct(event) {
  // Récupération de l'attribut data id dans la balise article
  const el = event.target;
  const parent = el.closest("article");
  const productId = parent.dataset.id;
  const productColor = parent.dataset.color;

  // Recherche du produit, ayant pour id productId et couleur ProductColor
  const products = getProductFromLocalStorage();
  const productIndex = findProductByIdAndColor(
    products,
    productId,
    productColor
  );

  // suppression du produit dans le local Storage et convertion en chaine de caractère
  if (productIndex > -1) {
    products.splice(productIndex, 1);
  }
  localStorage.setItem("basket", JSON.stringify(products));

  // Suppression du produit dans le Dom
  parent.remove();

  //Recalcul après suppression
  displayTotalPrice(products);
  setTotalQuantityProduct(products);
}

/**
 * Retourne la quantité totale de produit depuis le local storage
 * @returns int
 */
function getTotalQuantityProducts(products) {
  let total = 0;
  for (let product of products) {
    total = total + product.qty;
  }
  return total;
}

function setTotalQuantityProduct(products) {
  const elTotalArticles = document.getElementById("totalQuantity");
  elTotalArticles.innerText = getTotalQuantityProducts(products);
}

//Creation des balises
function displayCartProduct(product) {
  const sectionCart = document.getElementById("cart__items");
  const article = document.createElement(`article`);
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const infoContainer = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  const h2 = document.createElement("h2");
  const pColor = document.createElement("p");
  const pPrice = document.createElement("p");
  const settingContainer = document.createElement("div");
  const quantityContainer = document.createElement("div");
  const pQuantity = document.createElement("p");
  const input = document.createElement("input");
  const actionContainer = document.createElement("div");
  const pDelete = document.createElement("p");

  //Ajout des attributs et des valeurs
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", product._id);
  article.setAttribute(`data-color`, product.color);
  sectionCart.appendChild(article);

  imgContainer.setAttribute("class", "cart__item__img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  imgContainer.appendChild(img);
  article.appendChild(imgContainer);

  infoContainer.setAttribute("class", "cart__item__content");
  descriptionContainer.setAttribute(
    "class",
    "cart__item__content__description"
  );
  infoContainer.appendChild(descriptionContainer);

  h2.innerText = product.name;
  pColor.innerText = product.color;
  pPrice.innerText = product.price * product.qty + " €";
  descriptionContainer.appendChild(h2);
  descriptionContainer.appendChild(pColor);
  descriptionContainer.appendChild(pPrice);

  settingContainer.setAttribute("class", "cart__item__content__settings");
  quantityContainer.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  pQuantity.innerHTML = "Qté : ";
  article.appendChild(infoContainer);
  infoContainer.appendChild(settingContainer);
  settingContainer.appendChild(quantityContainer);
  quantityContainer.appendChild(pQuantity);

  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", product.qty);
  input.onchange = changeProductQuantity;
  quantityContainer.appendChild(input);

  actionContainer.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  pDelete.setAttribute("class", "deleteItem");
  pDelete.onclick = deleteCartProduct;
  pDelete.innerHTML = "Supprimer";
  settingContainer.appendChild(actionContainer);
  actionContainer.appendChild(pDelete);
}

function displayCart() {
  const products = getProductFromLocalStorage();

  // verifier si le panier est vide
  if (!products) {
    return;
  }

  for (const product of products) {
    displayCartProduct(product);
  }

  displayTotalPrice(products);
  setTotalQuantityProduct(products);
}

// Formulaire de contact
function validatePatternField (value, error, pattern, fieldError){
  if (!pattern.test(value)) {
    fieldError.innerText = error
    return false
  }
  else {
    fieldError.innerText = ""
    return true
  }
}



function validateRequiredField(value, error, fieldError) {
  if (!value) {
    fieldError.innerText = error;
    return false;
  } else {
    fieldError.innerText = "";
    return true;
  }
}




async function orderAction(event) {
  event.preventDefault();

  const firstNameEl = document.getElementById("firstName");
  const firstNameErrorEl = document.getElementById("firstNameErrorMsg");
  const firstName = firstNameEl.value;

  const lastNameEl = document.getElementById("lastName");
  const lastNameErrorEl = document.getElementById("lastNameErrorMsg");
  const lastName = lastNameEl.value;

  const addressEl = document.getElementById("address");
  const addressErrorEl = document.getElementById("addressErrorMsg");
  const address = addressEl.value;

  const cityEl = document.getElementById("city");
  const cityErrorEl = document.getElementById("cityErrorMsg");
  const city = cityEl.value;

  const emailEl = document.getElementById("email");
  const emailErrorEl = document.getElementById("emailErrorMsg");
  const email = emailEl.value;

  let isValidFirstname = validateRequiredField(
    firstName,
    "Vous devez entrer un prénom",
    firstNameErrorEl
  );
  let isValidLastname = validateRequiredField(
    lastName,
    "Vous devez entrer un nom",
    lastNameErrorEl
  );
  let isValidAdress = validateRequiredField(
    address,
    "Vous devez entrer une adresse",
    addressErrorEl
  );
  let isValidCity = validateRequiredField(
    city,
    "Vous devez entrer une ville",
    cityErrorEl
  );
  let isValidEmail = validateRequiredField(
    email,
    "Vous devez entrer une adresse email",
    emailErrorEl
  );

  if (firstName) {
    isValidFirstname = validatePatternField(
      firstName,
      "Le prénom doit être compris entre 3 et 50 caractères alphanumérique",
      /^[\w\s]{3,50}$/,
      firstNameErrorEl
      
    );
  }
  if (lastName) {
    isValidLastname =  validatePatternField
      (
      lastName,
      "Le nom doit être compris entre 3 et 50 caractères alphanumérique",
      /^[\w\s]{3,50}$/,
      lastNameErrorEl,
      
    );
  }
  if (address) {
    isValidAdress = validatePatternField(
      address,
      "L'adresse doit être comprise entre 3 et 100 caractères alphanumérique",
      /^[\w\s,.]{3,100}$/,
      addressErrorEl,
    );
  }
  if (city) {
    isValidCity = validatePatternField(
      city,
      "La ville doit être comprise entre 3 et 100 caractères alphanumérique",
      /^[\w\s,.]{3,100}$/,
      cityErrorEl,
    );
  }

  if (email) {
    isValidEmail = validatePatternField(
      email,
      "Adresse email invalide",
      /^[0-9a-z_\-.]{1,100}@[0-9a-z\-_.]{1,50}.[a-z]{2,5}$/,
      emailErrorEl
    );
  }

  if (
    !isValidFirstname ||
    !isValidLastname ||
    !isValidAdress ||
    !isValidCity ||
    !isValidEmail
  ) {
    return false;
  }

  const contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    city: city,
  };
  const productsStore = getProductFromLocalStorage();
  const products = [];

  if (!productsStore){
    alert ("Vous n'avez pas encore d'articles dans le panier")
    return
  }

  for (const product of productsStore) {
    products.push(product._id);
  }

  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({
      contact: contact,
      products: products,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  localStorage.removeItem("basket")

  window.location.href = "./confirmation.html?orderId=" + data.orderId;
}

displayCart();
