async function displayProducts() {
  const products = await getProducts()
  for (const product of products) {
    displayCardProduct(product.name, product.description, product.imageUrl, product.altTxt, product._id)
  }
}

displayProducts()
