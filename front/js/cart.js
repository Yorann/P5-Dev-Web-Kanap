function displayCart() {
const storageContent = localStorage.getItem("basket");
const products = JSON.parse(storageContent);
// verifier si le panier est vide
if(!products) {
    return;
}

for(const product of products) {
    displayCartProduct(product);
}
}

displayCart();



