var swiper = new Swiper(".mySwiper", {
    autoplay: {
        delay: 3500,
        pauseOnMouseEnter: true,
    },
    loop: true,
});


var swiper = new Swiper(".mySwiper1", {
    slidesPerView: "auto",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});












//  ----------------------- Accessing products CARD ------------------


const cards = document.querySelectorAll(".products-container .products .card");
const cartButtons = document.querySelectorAll(".products-container .products .btn-add-to-cart");

const products = Array.from(cards);
const addToCart = Array.from(cartButtons);





addToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
        const card = btn.closest('.card');
        const name = card.querySelector('.products-banner h5').textContent;
        const price = card.querySelector('.price-tag span').textContent;
        const srcImg = card.querySelector('img').getAttribute('src');

        console.log("add to cart is clicked");

        console.log(name);
        console.log(price);
        console.log(srcImg);



        cartUpdate(name, price, srcImg);
    });
});



//   ---------------------------- Accessing CART ------------------------------




// Function to add event listeners to delete buttons
function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll(".offcanvas-cart .delete-btn");
    
    
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("Delete button clicked");
            const row = button.closest("tr");
            row.remove();

            calculateSubtotalAndTotal();
            
        });
    });
}


function removeProductFromCart(productName) {
    const list = document.querySelector(".offcanvas-cart table tbody");
    const rows = list.querySelectorAll("tr");

    rows.forEach((row) => {
        const productNameElement = row.querySelector(".product-name");
        if (productNameElement && productNameElement.textContent === productName) {
            const quantityElement = row.querySelector(".product-quantity");
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity === 0) {
                row.remove();
            }
        }
    });

    // Recalculate subtotal and total
    calculateSubtotalAndTotal();
}



// Function to add event listeners to quantity buttons
function addQuantityButtonListeners(productName) {
    const incrementButtons = document.querySelectorAll(".offcanvas-cart .btn-plus");
    const decrementButtons = document.querySelectorAll(".offcanvas-cart .btn-minus");

    // Add event listeners for increment buttons
    incrementButtons.forEach((button) => {
        if (!button.hasEventListener) {
            button.addEventListener("click", (event) => incrementQuantity(event, productName));
            button.hasEventListener = true;
        }
    });

    // Add event listeners for decrement buttons
    decrementButtons.forEach((button) => {
        if (!button.hasEventListener) {
            button.addEventListener("click", (event) => decrementQuantity(event, productName));
            button.hasEventListener = true;
        }
    });
}

// Function to increment quantity
function incrementQuantity(event, productName) {
    const quantityElement = event.target.closest("tr").querySelector(".product-quantity");
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;


    // Recalculate subtotal and total
    calculateSubtotalAndTotal();
}

// Function to decrement quantity
function decrementQuantity(event, productName) {
    const quantityElement = event.target.closest("tr").querySelector(".product-quantity");
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;


        // Recalculate subtotal and total
       calculateSubtotalAndTotal();

        if (quantity === 0) {
            removeProductFromCart(productName);
        }

        
    }
}




// Function to update the cart quantity when the product quantity changes
// Function to update the cart and total
function cartUpdate(name, price, srcImg) {
    const list = document.querySelector(".offcanvas-cart table tbody");
    const rows = list.querySelectorAll("tr");

    // Check if the product is already in the cart
    let existingRow = null;
    rows.forEach((row) => {
        const productNameElement = row.querySelector(".product-name");

        if (productNameElement && productNameElement.textContent === name) {
            existingRow = row;
        }
    });

    if (existingRow) {
        // If the product is already in the cart, increment the quantity
        const quantityElement = existingRow.querySelector(".product-quantity");
        if (quantityElement) {
            let quantity = parseInt(quantityElement.textContent);
            quantity++; // Increment the quantity
            quantityElement.textContent = quantity; // Update the quantity
        }
    } else {
        // If the product is not in the cart, add it as a new row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div>
                    <img src="${srcImg}" alt="" width="40px">
                    <p class="m-0 product-name">${name}</p>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center flex-wrap-nowrap">
                    <button type="button" class="btn btn-minus">-</button>
                    <p class="product-quantity p-0 m-0">1</p>
                    <button type="button" class="btn btn-plus">+</button>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center flex-wrap-nowrap">
                    <i class="fa-solid fa-indian-rupee-sign"></i> 
                    <p class="price m-0">${price}</p>
                </div>
            </td>
            <td>
                <button type="button" class="btn delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>`;
        list.appendChild(row);
    }

    // Calculate and update the total
    calculateSubtotalAndTotal();

    // Add event listeners to delete buttons
    addDeleteButtonListeners();

    // Add event listeners to quantity buttons
    addQuantityButtonListeners(name);
}


// Function to update the cart quantity when the product quantity changes
function updateCartQuantity(name, quantity) {
    const list = document.querySelector(".offcanvas-cart table tbody");
    const rows = list.querySelectorAll("tr");

    // Find the row corresponding to the product name
    let targetRow = null;
    rows.forEach((row) => {
        const productNameElement = row.querySelector(".product-name");
        if (productNameElement && productNameElement.textContent === name) {
            targetRow = row;
        }
    });

    // Update the quantity in the target row
    if (targetRow) {
        const quantityElement = targetRow.querySelector(".product-quantity");
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }
}




// Function to calculate subtotal and total
function calculateSubtotalAndTotal() {
    const list = document.querySelector(".offcanvas-cart table tbody");
    const rows = list.querySelectorAll("tr");
    let subtotal = 0;

    rows.forEach((row) => {
        const quantity = parseInt(row.querySelector(".product-quantity").textContent);
        const price = parseFloat(row.querySelector(".price").textContent);
        subtotal += quantity * price;
    });

    // Calculate GST/Charges
    const gstCharges = subtotal * 0.18; // Example: 18% GST

    // Calculate total
    const total = subtotal + gstCharges;

    // Update subtotal and total in the UI
    document.querySelector(".total h5:nth-child(1)").textContent = `Itemtotal: ${subtotal.toFixed(2)}`;
    document.querySelector(".total h5:nth-child(2)").textContent = `Gst/Charges: ${gstCharges.toFixed(2)}`;
    document.querySelector(".total h5:nth-child(3)").textContent = `Total: ${total.toFixed(2)}`;
}


// Access the clear button
const clearButton = document.querySelector(".clear-btn");

// Add event listener to the clear button
clearButton.addEventListener("click", clearCart);

// Function to clear the cart
function clearCart() {
    // Select the cart table body
    const cartTableBody = document.querySelector(".offcanvas-cart table tbody");

    // Remove all rows from the cart
    cartTableBody.innerHTML = "";

    // Recalculate subtotal and total
    calculateSubtotalAndTotal();
}
