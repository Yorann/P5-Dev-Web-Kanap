let product
const addToCartBtn = document.querySelector("#addToCart")
addToCartBtn.addEventListener("click", addToCart)
async function getProductById() {
    const id = getProductIdInUrl()
    product = await getProduct(id)
    displaySingleProduct(product)
}

function addToCart() {
    /* */
    const elColor = document.getElementById("colors")
    const color = elColor.value
    if (!color) {
        alert("Vous devez selectionner une couleur")
        return
    }

    const elQuantity = document.getElementById("quantity")
    const quantity = elQuantity.value
    if (quantity < 1) {
        alert("Vous devez selectionner une quantité")
        return
    }
    let basket = localStorage.getItem("basket")
    if (!basket) {
        basket = []
    } else {
        basket = JSON.parse(basket)
    }

    let findProduct = basket.findIndex(function (value, index) {
        if (value._id === product._id && value.color === color) {
            return true;
        } else {
            return false;
        }
    }
    )
    if (findProduct > -1) {
        //Produit existant//   
        const curentProduct = basket[findProduct]
        curentProduct.qty = parseInt(curentProduct.qty) + parseInt(quantity)
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
        }
        basket.push(basketItem)
    }
    localStorage.setItem("basket", JSON.stringify(basket))
}

getProductById()

