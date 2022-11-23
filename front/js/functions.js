
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