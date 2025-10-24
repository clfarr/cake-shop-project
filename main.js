// ============================================
// SWEET TREATS CAKE SHOP - JAVASCRIPT
// ============================================

// aDbJRArw18jYCeiLPuhWnxaH9GI8i9d7
// Get one free at: https://developers.giphy.com/
const API_KEY = 'aDbJRArw18jYCeiLPuhWnxaH9GI8i9d7';

// API endpoint (where we get the data from)
const API_URL = 'https://api.giphy.com/v1/gifs/search';

// ============================================
// STEP 1: Get the HTML elements we need
// ============================================

// Get the search form
const searchForm = document.getElementById('search-form');

// Get the search input field
const searchInput = document.getElementById('search-input');

// Get the container where we'll put the images
const resultsContainer = document.getElementById('results-container');

// ============================================
// STEP 2: Listen for when user submits the form
// ============================================

searchForm.addEventListener('submit', function(event) {
    // Prevent the page from refreshing (default form behavior)
    event.preventDefault();
    
    // Get what the user typed
    const searchTerm = searchInput.value.trim();
    
    // Make sure they actually typed something
    if (searchTerm === '') {
        alert('Please enter a search term!');
        return;
    }
    
    // Call our function to search Giphy
    searchGiphy(searchTerm);
});

// ============================================
// STEP 3: Function to search Giphy API
// ============================================

function searchGiphy(searchTerm) {
    // Check if API key is set
    if (API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === '') {
        resultsContainer.innerHTML = '<p class="initial-message">⚠️ Oops! Please add your Giphy API key in main.js to use the search feature.</p>';
        return;
    }
    
    // Show a loading message
    resultsContainer.innerHTML = '<p class="loading">Searching for delicious cakes... 🔍</p>';
    
    // Build the complete URL with our search term
    // We're asking for 12 results, rated G (family-friendly)
    const url = `${API_URL}?api_key=${API_KEY}&q=${searchTerm}&limit=12&rating=g`;
    
    // Make the request to Giphy
    fetch(url)
        .then(function(response) {
            // Convert the response to JSON (JavaScript Object)
            return response.json();
        })
        .then(function(data) {
            // Call our function to display the images
            displayResults(data);
        })
        .catch(function(error) {
            // If something goes wrong, show an error message
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = '<p class="initial-message">Oops! Something went wrong. Please try again. 😞</p>';
        });
}
    // Build the complete URL with our search term
    // We're asking for 12 results, rated G (family-friendly)
    const url = `${API_URL}?api_key=${API_KEY}&q=${searchTerm}&limit=12&rating=g`;
    
    // Make the request to Giphy
    fetch(url)
        .then(function(response) {
            // Convert the response to JSON (JavaScript Object)
            return response.json();
        })
        .then(function(data) {
            // Call our function to display the images
            displayResults(data);
        })
        .catch(function(error) {
            // If something goes wrong, show an error message
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = '<p class="initial-message">Oops! Something went wrong. Please try again. 😞</p>';
        });
}

// ============================================
// STEP 4: Function to display the images
// ============================================

function displayResults(data) {
    // Clear the container
    resultsContainer.innerHTML = '';
    
    // Check if we got any results
    if (data.data.length === 0) {
        resultsContainer.innerHTML = '<p class="initial-message">No cakes found. Try a different search! 🎂</p>';
        return;
    }
    
    // Loop through each result from Giphy
    data.data.forEach(function(gif) {
        // Get the image URL from the gif object
        const imageUrl = gif.images.fixed_height.url;
        
        // Get the title (for accessibility)
        const title = gif.title || 'Cake image';
        
        // Create an image element
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = title;
        img.className = 'cake-image';
        
        // Add the image to the results container
        resultsContainer.appendChild(img);
    });
}

//Clear Button Functionality
const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
    // Clear the search input
    searchInput.value = '';
});

// ============================================
// THAT'S IT! Your cake shop search is ready!
// ============================================

// HOW IT WORKS:
// 1. User types something like "birthday cake" and clicks Search
// 2. The form submission is captured by our event listener
// 3. We call searchGiphy() which sends a request to Giphy's API
// 4. Giphy sends back data with cake GIFs/images
// 5. We call displayResults() which creates <img> tags and adds them to the page
// 6. The CSS makes them look pretty in a grid!