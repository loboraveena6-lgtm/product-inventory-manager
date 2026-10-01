// ==========================================
// EcoStore
// Sustainable Product Inventory Manager
// ==========================================


// ==========================================
// BASIC TYPES
// ==========================================

// string type
let storeName: string = "EcoStore";

// number type
let taxRate: number = 0.18;

// boolean type
let storeOpen: boolean = true;


// ==========================================
// INTERFACE
// ==========================================

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}


// ==========================================
// PRODUCT ARRAY
// ==========================================

let products: Product[] = [
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

function calculateProductValue(product: Product): number {

    return product.price * product.quantity;
}


// ==========================================
// FUNCTION
// Check product stock
// ==========================================

function checkStock(quantity: number): string {

    if (quantity > 0) {

        return "In Stock";

    } else {

        return "Out of Stock";
    }
}


// ==========================================
// FUNCTION
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(): void {

    const table =
        document.getElementById("productTable");

    if (!table) {
        return;
    }


    table.innerHTML = "";


    let totalValue: number = 0;


    products.forEach(function (product: Product): void {

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


    const totalElement =
        document.getElementById("totalValue");


    if (totalElement) {

        totalElement.textContent =
            `Total Inventory Value: ₹${totalValue}`;
    }


    const countElement =
        document.getElementById("productCount");


    if (countElement) {

        countElement.textContent =
            `Total Products: ${products.length}`;
    }
}


// ==========================================
// FUNCTION
// ADD PRODUCT
// ==========================================

function addProduct(): void {

    const nameInput =
        document.getElementById(
            "productName"
        ) as HTMLInputElement;


    const priceInput =
        document.getElementById(
            "productPrice"
        ) as HTMLInputElement;


    const quantityInput =
        document.getElementById(
            "productQuantity"
        ) as HTMLInputElement;


    const categoryInput =
        document.getElementById(
            "productCategory"
        ) as HTMLInputElement;


    const name: string =
        nameInput.value;


    const price: number =
        Number(priceInput.value);


    const quantity: number =
        Number(quantityInput.value);


    const category: string =
        categoryInput.value;


    // Validation

    if (
        name === "" ||
        category === "" ||
        price <= 0 ||
        quantity < 0
    ) {

        alert(
            "Please enter valid product details."
        );

        return;
    }


    // Create new product

    const newProduct: Product = {

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

function deleteProduct(id: number): void {

    products = products.filter(
        function (product: Product): boolean {

            return product.id !== id;
        }
    );


    displayProducts();
}


// ==========================================
// EVENT LISTENER
// ==========================================

const addButton =
    document.getElementById("addButton");


if (addButton) {

    addButton.addEventListener(
        "click",
        addProduct
    );
}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts();