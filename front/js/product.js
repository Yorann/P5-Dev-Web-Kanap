let product;
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", addToCart);

//function displaySingleProduct(title, price, description, colors) {
function displaySingleProduct(product) {
    if(!Object.keys(product).length){
   
        return
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

async function getProductById() {
  const id = getKeyInUrl("id");
  product = await getProduct(id);
  displaySingleProduct(product);
}

function addToCart() {

    if(!Object.keys(product).length){
   alert("Produit inexistant")
        return
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

  let findProduct = basket.findIndex(function (value, index) {
    if (value._id === product._id && value.color === color) {
      return true;
    } else {
      return false;
    }
  });
  if (findProduct > -1) {
    //Produit existant//
    const curentProduct = basket[findProduct];
    curentProduct.qty = parseInt(curentProduct.qty) + parseInt(quantity);
  } else {
    //Nouveau produit//
    const basketItem = {
      _id: product._id,
      color: color,
      qty: parseInt(quantity),
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      altTxt: product.altTxt,
    };
    basket.push(basketItem);
    alert ("Le produit a été ajouté")
  }
  localStorage.setItem("basket", JSON.stringify(basket));
}

getProductById();
