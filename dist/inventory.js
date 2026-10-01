"use strict";
// ==========================================
// EcoStore
// Sustainable Product Inventory Manager
// ==========================================
// ==========================================
// BASIC TYPES
// ==========================================
// string type
let storeName = "EcoStore";
// number type
let taxRate = 0.18;
// boolean type
let storeOpen = true;
// ==========================================
// PRODUCT ARRAY
// ==========================================
let products = [
    {
        id: 1,
        name: "Solar Power Bank",
        price: 2499,
        quantity: 8,
        category: "Solar"
    },
    {
        id: 2,
        name: "Bamboo Laptop Stand",
        price: 1299,
        quantity: 12,
        category: "Eco Office"
    },
    {
        id: 3,
        name: "Plantable Seed Pen",
        price: 50,
        quantity: 100,
        category: "Stationery"
    },
    {
        id: 4,
        name: "Reusable Coffee Cup",
        price: 399,
        quantity: 35,
        category: "Kitchen"
    },
    {
        id: 5,
        name: "Solar Reading Lamp",
        price: 899,
        quantity: 15,
        category: "Solar"
    }
];
// ==========================================
// FUNCTION
// Calculate product value
// ==========================================
function calculateProductValue(product) {
    return product.price * product.quantity;
}
// ==========================================
// FUNCTION
// Check product stock
// ==========================================
function checkStock(quantity) {
    if (quantity > 0) {
        return "In Stock";
    }
    else {
        return "Out of Stock";
    }
}
// ==========================================
// FUNCTION
// DISPLAY PRODUCTS
// ==========================================
function displayProducts() {
    const table = document.getElementById("productTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    let totalValue = 0;
    products.forEach(function (product) {
        totalValue += calculateProductValue(product);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>

            <td>₹${product.price}</td>

            <td>${product.quantity}</td>

            <td>${product.category}</td>

            <td>${checkStock(product.quantity)}</td>

            <td>
                <button
                    class="delete-button"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>
            </td>
        `;
        table.appendChild(row);
    });
    const totalElement = document.getElementById("totalValue");
    if (totalElement) {
        totalElement.textContent =
            `Total Inventory Value: ₹${totalValue}`;
    }
    const countElement = document.getElementById("productCount");
    if (countElement) {
        countElement.textContent =
            `Total Products: ${products.length}`;
    }
}
// ==========================================
// FUNCTION
// ADD PRODUCT
// ==========================================
function addProduct() {
    const nameInput = document.getElementById("productName");
    const priceInput = document.getElementById("productPrice");
    const quantityInput = document.getElementById("productQuantity");
    const categoryInput = document.getElementById("productCategory");
    const name = nameInput.value;
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    const category = categoryInput.value;
    // Validation
    if (name === "" ||
        category === "" ||
        price <= 0 ||
        quantity < 0) {
        alert("Please enter valid product details.");
        return;
    }
    // Create new product
    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity,
        category: category
    };
    // Add product to array
    products.push(newProduct);
    // Display updated inventory
    displayProducts();
    // Clear input fields
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    categoryInput.value = "";
}
// ==========================================
// FUNCTION
// DELETE PRODUCT
// ==========================================
function deleteProduct(id) {
    products = products.filter(function (product) {
        return product.id !== id;
    });
    displayProducts();
}
// ==========================================
// EVENT LISTENER
// ==========================================
const addButton = document.getElementById("addButton");
if (addButton) {
    addButton.addEventListener("click", addProduct);
}
// ==========================================
// INITIAL DISPLAY
// ==========================================
displayProducts();
