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
function getProductFromLocalStorage() {
  const storageContent = localStorage.getItem("basket")
  const products = JSON.parse(storageContent)
  return products
}
