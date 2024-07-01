document.addEventListener('DOMContentLoaded', function () {
    var buyButton = document.querySelector('.buy-button');
    if (buyButton) {
      buyButton.addEventListener('click', function (event) {
        event.preventDefault();
  
        var form = event.target.closest('form');
        var formData = new FormData(form);
  
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Product added to cart:', data);
          
   ;
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
      });
    }
  });