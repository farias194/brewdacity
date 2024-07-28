document.addEventListener('DOMContentLoaded', function() {
    const collectionSelect = document.getElementById('CollectionSelect');
    const collectionContent = document.getElementById('collection-content');
  
    collectionSelect.addEventListener('change', function() {
      const selectedCollection = collectionSelect.value;
      fetchCollection(selectedCollection);
    });
  
    function fetchCollection(handle) {
      if (handle) {
        fetch(`/collections/${handle}`)
          .then(response => response.text())
          .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const products = doc.querySelector('.collection__products');
  
            if (products) {
              collectionContent.innerHTML = products.innerHTML;
            } else {
              collectionContent.innerHTML = '<p>No products found.</p>';
            }
          })
          .catch(error => {
            console.error('Error fetching collection:', error);
            collectionContent.innerHTML = '<p>Error loading collection.</p>';
          });
      } else {
        collectionContent.innerHTML = '<p>Please select a collection.</p>';
      }
    }
  
    // Load the initial collection based on the current selection
    if (collectionSelect.value) {
      fetchCollection(collectionSelect.value);
    } else if (collectionSelect.options[1].value) {
      fetchCollection(collectionSelect.options[1].value);
    }
  });
  