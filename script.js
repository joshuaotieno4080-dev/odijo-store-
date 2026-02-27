function orderProduct(productName, price) {
  let message = `New Order: ${productName} - Price: ${price}`;
  let whatsappUrl = `https://api.whatsapp.com/send?phone=YOUR_WHATSAPP_NUMBER&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}
