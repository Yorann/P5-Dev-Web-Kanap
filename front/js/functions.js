

function displayCardProduct(name, description, src, alt, id) {
  var sectionProducts = document.getElementById("items")
  var a = document.createElement("a")
  var article = document.createElement("article")
  var img = document.createElement("img")
  var h3 = document.createElement("h3")
  var p = document.createElement("p")
  var h3Text = document.createTextNode(name)
  var pText = document.createTextNode(description)

  a.setAttribute("href", "./product.html?id=" + id)
  //img.setAttribute("src", src)
  img.src = src
  img.setAttribute("alt", alt)
  h3.setAttribute("class", "productName")
  p.setAttribute("class", "productDescription")

  p.appendChild(pText)
  h3.appendChild(h3Text)
  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(p)
  a.appendChild(article)
  sectionProducts.appendChild(a)
}

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products")
  return response.json()
}

//function displaySingleProduct(title, price, description, colors) {
function displaySingleProduct(product) {
  const elTitle = document.getElementById("title")
  const elPrice = document.getElementById("price")
  const elDescription = document.getElementById("description")
  const elColor = document.getElementById("colors")
  const elImgContainer = document.querySelector(".item__img")
  const elImg = new Image()
  elImg.src = product.imageUrl
  elImg.alt = product.altTxt
  elImgContainer.appendChild(elImg)
  console.log(elImg)
  elTitle.innerText = product.name
  elPrice.innerText = product.price + " "
  elDescription.innerText = product.description
  for (const color of product.colors) {
    const option = new Option(color, color)
    elColor.options[elColor.options.length] = option
  }
}

async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id)
  return response.json()
}

function getProductIdInUrl() {
  const url = new URL(window.location.href)
  const id = url.searchParams.get("id")
  return id
}

function displayCartProduct(product) {
  //Creation des balises
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
  quantityContainer.appendChild(pQuantity )

  input.setAttribute("type", "number")
  input.setAttribute("class", "itemQuantity")
  input.setAttribute("name", "itemQuantity")
  input.setAttribute("min", "1")
  input.setAttribute("max", "100")
  input.setAttribute("value", product.qty)
  quantityContainer.appendChild(input)

  actionContainer.setAttribute("class", "cart__item__content__settings__delete")
  pDelete.setAttribute("class", "deleteItem") 
  pDelete.innerHTML = "Supprimer"
  settingContainer.appendChild(actionContainer)
  actionContainer.appendChild(pDelete)
}