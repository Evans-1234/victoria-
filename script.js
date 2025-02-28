// Updated Liquor Store App JavaScript with Rating System and Stock Management
const products = {
    "Wines": ["Red Wine", "White Wine", "Rose Wine", "Sparkling Wine", "Dessert Wine", "Table Wine", "Fruit Wine", "Ice Wine", "Dry Wine", "Organic Wine"],
    "Spirits": ["Gin", "Rum", "Brandy", "Absinthe", "Mezcal", "Pisco", "Cachaca", "Schnapps", "Soju", "Grappa"],
    "Tequila": ["Blanco", "Reposado", "Anejo", "Extra Anejo", "Cristalino", "Gold Tequila", "Silver Tequila", "Agave Tequila", "Mixto Tequila", "Reserva Tequila"],
    "Soft Drinks": ["Coca-Cola", "Pepsi", "Sprite", "Fanta", "Mountain Dew", "Ginger Ale", "Root Beer", "Tonic Water", "Club Soda", "Lemonade"],
    "Vodka": ["Classic Vodka", "Flavored Vodka", "Premium Vodka", "Wheat Vodka", "Potato Vodka", "Corn Vodka", "Grape Vodka", "Rye Vodka", "Organic Vodka", "Crystal Vodka"],
    "Brandy": ["Cognac", "Armagnac", "American Brandy", "Spanish Brandy", "Fruit Brandy", "Grape Brandy", "Aged Brandy", "Fine Brandy", "XO Brandy", "VSOP Brandy"],
    "Whiskey": ["Scotch Whisky", "Irish Whiskey", "Bourbon", "Rye Whiskey", "Japanese Whisky", "Single Malt", "Blended Whiskey", "Tennessee Whiskey", "Corn Whiskey", "Canadian Whisky"]
};

let stock = {};
let price = 250;
let ratings = {}; // Stores ratings

for (let category in products) {
    stock[category] = {};
    ratings[category] = {};
    products[category].forEach(drink => {
        stock[category][drink] = { quantity: 40, price: price };
        ratings[category][drink] = { totalStars: 0, totalRatings: 0 };
    });
}

// Select Elements
const categories = document.querySelectorAll('.category');
const productsSection = document.getElementById('products');
const productList = document.querySelector('.product-list');
const productTitle = document.getElementById('product-title');
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const adminPass = document.getElementById('adminPass');
const loginAdmin = document.getElementById('loginAdmin');
const adminPanel = document.getElementById('adminPanel');
const stockList = document.getElementById('stockList');
const backBtn = document.getElementById('backBtn');
const logoutAdmin = document.getElementById('logoutAdmin');

// Hide Admin Panel Initially
adminPanel.style.display = "none";

// Open Admin Login Modal
adminBtn.addEventListener('click', () => {
    adminModal.style.display = "block";
});

// Admin Login Validation
loginAdmin.addEventListener('click', () => {
    if (adminPass.value === "admin123") {
        adminModal.style.display = "none";
        adminPanel.style.display = "block";
        updateStockView();
    } else {
        alert("Wrong password! Access Denied.");
    }
});

// Handle Category Selection
categories.forEach(btn => {
    btn.addEventListener('click', () => {
        let category = btn.dataset.category;
        productTitle.innerText = category;
        productList.innerHTML = "";

        products[category].forEach(product => {
            productList.innerHTML += `<div class="product" data-category="${category}">
                <p>${product} - <strong>Ksh ${price}</strong></p>
                <button onclick="buyDrink('${category}', '${product}')">Buy</button>
                <div class="rating" id="rating-${category}-${product.replace(/\s+/g, '-')}">
                    <span class="star" onclick="rateDrink('${category}', '${product}', 1)">&#9733;</span>
                    <span class="star" onclick="rateDrink('${category}', '${product}', 2)">&#9733;</span>
                    <span class="star" onclick="rateDrink('${category}', '${product}', 3)">&#9733;</span>
                    <span class="star" onclick="rateDrink('${category}', '${product}', 4)">&#9733;</span>
                </div>
            </div>`;
        });

        productsSection.classList.remove('hidden');
        document.getElementById('categories').classList.add('hidden');
    });
});

// Buy Drink Function
function buyDrink(category, drink) {
    if (stock[category][drink].quantity > 0) {
        stock[category][drink].quantity--;
        alert(`${drink} purchased! Please rate the product.`);
        updateStockView();
    } else {
        alert(`${drink} is out of stock!`);
    }
}

// Rating Function
function rateDrink(category, drink, stars) {
    ratings[category][drink].totalStars += stars;
    ratings[category][drink].totalRatings++;
    alert(`You rated ${drink} with ${stars} stars!`);
    updateStockView();
}

// Update Stock View in Admin Panel
function updateStockView() {
    stockList.innerHTML = "<h3>Stock Levels</h3>";
    for (let category in stock) {
        stockList.innerHTML += `<h4>${category}</h4>`;
        for (let drink in stock[category]) {
            let avgRating = ratings[category][drink].totalRatings > 0 ? (ratings[category][drink].totalStars / ratings[category][drink].totalRatings).toFixed(1) : "No Ratings";
            stockList.innerHTML += `<p>${drink}: <strong>${stock[category][drink].quantity}</strong> left - Price: Ksh ${stock[category][drink].price} - Rating: ${avgRating}⭐
                <input type="number" id="increase-${drink}" placeholder="Increase Stock">
                <button onclick="increaseStock('${category}', '${drink}')">Increase</button>
            </p>`;
        }
    }
}

// Increase Stock Function
function increaseStock(category, drink) {
    let increaseAmount = parseInt(document.getElementById(`increase-${drink}`).value);
    if (!isNaN(increaseAmount) && increaseAmount > 0) {
        stock[category][drink].quantity += increaseAmount;
        alert(`${increaseAmount} units added to ${drink}`);
        updateStockView();
    } else {
        alert("Enter a valid stock increase amount.");
    }
}

// Admin Logout
logoutAdmin.addEventListener('click', () => {
    adminPanel.style.display = "none";
    adminModal.style.display = "none";
    adminPass.value = "";
});

// Back Button to Return to Categories
backBtn.addEventListener('click', () => {
    productsSection.classList.add('hidden');
    document.getElementById('categories').classList.remove('hidden');
});
