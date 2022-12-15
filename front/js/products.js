/**
 * Construit et affiche un produit sur la page d'acceuil à partir de ses paramètres
 * @param {string} name
 * @param {string} description
 * @param {string} src
 * @param {string} alt
 * @param {string} id
 * @returns {void}
 */
function displayCardProduct(name, description, src, alt, id) {
  var sectionProducts = document.getElementById("items");
  var a = document.createElement("a");
  var article = document.createElement("article");
  var img = document.createElement("img");
  var h3 = document.createElement("h3");
  var p = document.createElement("p");
  var h3Text = document.createTextNode(name);
  var pText = document.createTextNode(description);

  a.setAttribute("href", "./product.html?id=" + id);
  img.src = src;
  img.setAttribute("alt", alt);
  h3.setAttribute("class", "productName");
  p.setAttribute("class", "productDescription");

  p.appendChild(pText);
  h3.appendChild(h3Text);
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  a.appendChild(article);
  sectionProducts.appendChild(a);
}

/**
 * Recupère les produits depuis l'api, les parcours et les affiche sur la page d'acceuil
 * @returns {void}
 */
async function displayProducts() {
  const products = await getProducts();
  for (const product of products) {
    displayCardProduct(
      product.name,
      product.description,
      product.imageUrl,
      product.altTxt,
      product._id
    );
  }
}

displayProducts();
