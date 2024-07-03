document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('add-to-cart-form');
  
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        var formData = new FormData(form);
  
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw new Error(error.description);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Product added to cart:', data);
          alert('Product added to cart');
          // Update cart UI
          updateCartUI(data);
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
          alert('There was an error adding the product to the cart.');
        });
      });
    }
  
    function updateCartUI(data) {
      // Update the cart UI, such as cart count, cart items, etc.
      var cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        fetch('/cart.js', {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => response.json())
        .then(cartData => {
          cartCount.textContent = cartData.item_count;
        });
      }
    }
  });
  
 