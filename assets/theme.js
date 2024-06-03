document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    cartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        addToCart(this.dataset.productId, 1); // Add the item to the cart
      });
    });
  });
  
  function addToCart(productId, quantity) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ items: [{ id: productId, quantity: quantity }] })
    })
    .then(response => response.json())
    .then(data => {
      updateCartCount(data.item_count);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.innerText = count;
    }
  }
  