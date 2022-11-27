
function changeProductQuantity(event) {
  const el = event.target
  const parent = el.closest("article")
  const productId = parent.dataset.id
  const productColor = parent.dataset.color
  const qty = el.value
  const elPrice = document.querySelector ('article[data-id="' +
   productId +
    '"] ' +
     '.cart__item__content__description p:nth-child(3)'
     )

  // Recherche du produit, ayant pour id productId et couleur productColor
  const products = getProductFromLocalStorage()
  const productIndex = products.findIndex(function (product) {
    if (product._id === productId && product.color === productColor) {
      return true;
    } else {
      return false;
    }
  });
  //Mise à jour de la quantité de produits
  if (productIndex > -1) {
    products[productIndex].qty = parseInt(qty)
    elPrice.innerHTML = qty * products[productIndex].price + ` &euro;`; 
  }

  localStorage.setItem("basket", JSON.stringify(products))

  displayTotalPrice(products)
}



function displayTotalPrice(products) {
  let total = 0
  //Calcul du prix total
  for (const product of products) {
    const price = product.price * product.qty
    total += price
  }

  const elTotalPrice = document.getElementById("totalPrice")
  elTotalPrice.innerText = total
}
function deleteCartProduct(event) {
  // Récupération de l'attribut data id dans la balise article
  const el = event.target
  const parent = el.closest("article")
  const productId = parent.dataset.id
  const productColor = parent.dataset.color


  // Recherche du produit, ayant pour id productId et couleur ProductColor
  const products = getProductFromLocalStorage()
  if (!products) {
    return
  }
  const productIndex = products.findIndex(function (product) {
    if (product._id === productId && product.color === productColor) {
      return true;
    } else {
      return false;
    }
  });

  // suppression du produit dans le local Storage et convertion en chaine de caractère
  if (productIndex > -1) {
    products.splice(productIndex, 1)
  }
  localStorage.setItem("basket", JSON.stringify(products))

  // Suppression du produit dans le Dom
  parent.remove()

  //Recalcul après suppression
  displayTotalPrice(products)
}

//Creation des balises
function displayCartProduct(product) {
  const sectionCart = document.getElementById("cart__items")
  const article = document.createElement(`article`)
  const imgContainer = document.createElement("div")
  const img = document.createElement("img")
  const infoContainer = document.createElement("div")
  const descriptionContainer = document.createElement("div")
  const h2 = document.createElement("h2")
  const pColor = document.createElement("p")
  const pPrice = document.createElement("p")
  const settingContainer = document.createElement("div")
  const quantityContainer = document.createElement("div")
  const pQuantity = document.createElement("p")
  const input = document.createElement("input")
  const actionContainer = document.createElement("div")
  const pDelete = document.createElement("p")
  const elTotalArticles = document.getElementById("totalQuantity")
  elTotalArticles.innerText = product.qty

  //Ajout des attributs et des valeurs
  article.setAttribute("class", "cart__item")
  article.setAttribute("data-id", product._id)
  article.setAttribute(`data-color`, product.color)
  sectionCart.appendChild(article)

  imgContainer.setAttribute("class", "cart__item__img")
  img.setAttribute("src", product.imageUrl)
  img.setAttribute("alt", product.altTxt)
  imgContainer.appendChild(img)
  article.appendChild(imgContainer)

  infoContainer.setAttribute("class", "cart__item__content")
  descriptionContainer.setAttribute("class", "cart__item__content__description")
  infoContainer.appendChild(descriptionContainer)

  h2.innerText = product.name
  pColor.innerText = product.color
  pPrice.innerText = (product.price * product.qty + " €")
  descriptionContainer.appendChild(h2)
  descriptionContainer.appendChild(pColor)
  descriptionContainer.appendChild(pPrice)

  settingContainer.setAttribute("class", "cart__item__content__settings")
  quantityContainer.setAttribute("class", "cart__item__content__settings__quantity")
  pQuantity.innerHTML = "Qté : "
  article.appendChild(infoContainer)
  infoContainer.appendChild(settingContainer)
  settingContainer.appendChild(quantityContainer)
  quantityContainer.appendChild(pQuantity)

  input.setAttribute("type", "number")
  input.setAttribute("class", "itemQuantity")
  input.setAttribute("name", "itemQuantity")
  input.setAttribute("min", "1")
  input.setAttribute("max", "100")
  input.setAttribute("value", product.qty)
  input.onchange = changeProductQuantity
  quantityContainer.appendChild(input)

  actionContainer.setAttribute("class", "cart__item__content__settings__delete")
  pDelete.setAttribute("class", "deleteItem")
  pDelete.onclick = deleteCartProduct
  pDelete.innerHTML = "Supprimer"
  settingContainer.appendChild(actionContainer)
  actionContainer.appendChild(pDelete)


}


function displayCart() {
  const products = getProductFromLocalStorage()

  // verifier si le panier est vide
  if (!products) {
    return;
  }

  for (const product of products) {
    displayCartProduct(product)
  }

  displayTotalPrice(products)
}

displayCart();



