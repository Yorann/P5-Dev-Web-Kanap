
function displayOrderId (){
  const orderId = getKeyInUrl("orderId")
  const orderElement = document.getElementById("orderId") 
   orderElement.innerText = orderId
}
displayOrderId()
