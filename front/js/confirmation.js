/**
 * Affiche le numéro de commande dans la page confirmation
 * @returns {void}
 */
function displayOrderId() {
  const orderId = getKeyInUrl("orderId");
  const orderElement = document.getElementById("orderId");
  orderElement.innerText = orderId;
}

displayOrderId();
