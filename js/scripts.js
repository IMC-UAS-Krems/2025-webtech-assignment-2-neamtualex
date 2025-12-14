const carProducts = [
    { id: 1, name: "Mercedes-Benz E220d 2025", price: 76000, image: "images/e220d.jpg" },
    { id: 2, name: "Mercedes-Benz CLA 45s 2025", price: 67500, image: "images/45s.jpg" },
    { id: 3, name: "Mercedes-Benz G 63 2025", price: 220000, image: "images/g63.jpg" },
    { id: 4, name: "Mercedes-Benz BRABUS x Mansory 2025", price: 384000, image: "images/brabus.jpg"},
    {id: 5, name: "Mercedes-Benz GT 63 2025", price: 189000, image: "images/gt63.jpg"},
    {id: 6, name: "Mercedes-Benz C63 2025", price: 98000, image: "images/c63.jpg"},
    {id: 7, name: "Mercedes-Benz GT 63 BRABUS 800 ROCKET 2025", price: 220000, image: "images/brabus800.jpg"},
    {id: 8, name: "Mercedes-Benz S680 Maybach 2025", price: 280000, image: "images/maybach.jpg"},
    {id: 9, name: "Mercedes-Benz S500 2025", price: 135000, image: "images/s505.jpg"},
    {id: 10, name: "Mercedes-Benz Maybach Coupe 2025", price: 250000, image: "images/sl680.jpg"},
];

let shoppingBasket = [];

// Displaying the car products with price x 1 x2 
function renderCarProducts() {
    const displayArea = document.getElementById("product-display-area");
    displayArea.innerHTML = "";
    carProducts.forEach((car) => {
        const productCard = `
            <div class="col-md-4 p-3">
                <div class="card custom-card border border-danger bg-dark text-white">
                    <img src="${car.image}" class="card-img-top" style="height: 650px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${car.name}</h5>
                        <p class="card-text">Price: € ${car.price.toLocaleString()}</p>
                        <button class="btn btn-danger" onclick="addToBasket(${car.id})">Add to Cart</button>
                    </div>
                </div>
            </div>`;
        displayArea.innerHTML += productCard;
    });
}

// Add a car to the basket
function addToBasket(carId) {
    const selectedCar = carProducts.find((car) => car.id === carId);
    const carInBasket = shoppingBasket.find((item) => item.id === carId);

    if (carInBasket) {
        carInBasket.quantity += 1;
    } else {
        shoppingBasket.push({ ...selectedCar, quantity: 1 });
    }

    document.getElementById("basket-section").classList.remove("d-none");
    renderBasket();
}

// Render basket
function renderBasket() {
    const basketContent = document.getElementById("basket-content");
    basketContent.innerHTML = "";
    shoppingBasket.forEach((item, index) => {
        basketContent.innerHTML += `
            <tr style="background-color: #2e2e2e; border-bottom: 2px solid darkred;">
                <td>${item.name}</td>
                <td><img src="${item.image}" class="cart-item" style="width: 100px; height: 100px; object-fit: cover; border: 2px solid darkred; border-radius: 5px;"></td>
                <td>${item.quantity}</td>
                <td>€ ${(item.price * item.quantity).toLocaleString()}</td>
                <td>
                    <button class="btn btn-custom-black btn-sm" onclick="increaseQuantity(${index})">+</button>
                    <button class="btn btn-custom-black btn-sm" onclick="decreaseQuantity(${index})">-</button>
                    <button class="btn btn-danger btn-sm" onclick="removeFromBasket(${index})">Remove</button>
                </td>
            </tr>`;
    })

    updateBasketTotal();
}

// Update basket total + to have a 5% discount
function updateBasketTotal() {
    const total = shoppingBasket.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total * 0.05; // Calculate 5% discount of car
    const totalAfterDiscount = total - discount; // Apply the discount

    document.querySelector(".cart-total").innerHTML = `
        <p>Subtotal: € ${total.toLocaleString()}</p>
        <p>Discount (5%): -€ ${discount.toFixed(2)}</p>
        <p><strong>Total: € ${totalAfterDiscount.toLocaleString()}</strong></p>`;
}

// Increase item quantity
function increaseQuantity(index) {
    shoppingBasket[index].quantity += 1;
    renderBasket();
}

// Decrease item quantity
function decreaseQuantity(index) {
    const item = shoppingBasket[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        shoppingBasket.splice(index, 1);
        if (shoppingBasket.length === 0) {
            hideBasket();
        }
    }
    renderBasket();
}

// Remove an item from the basket
function removeFromBasket(index) {
    shoppingBasket.splice(index, 1);
    if (shoppingBasket.length === 0) {
        hideBasket();
    }
    renderBasket();
}

// Hide basket when empty
function hideBasket() {
    document.getElementById("basket-section").classList.add("d-none");
}

// Initialize display
document.addEventListener("DOMContentLoaded", () => {
    renderCarProducts();

    document.getElementById("continue-checkout").addEventListener("click", () => {
        document.getElementById("purchase-form").classList.remove("d-none");
    });

    document.getElementById("submit-purchase").addEventListener("click", () => {
        const summary = document.getElementById("order-details");
        const totalItems = shoppingBasket.reduce((sum, item) => sum + item.quantity, 0);
        const total = shoppingBasket.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discount = total * 0.05; // Apply 5% discount
        const totalAfterDiscount = total - discount;

        summary.innerHTML = `
            <p>Total Items: ${totalItems}</p>
            <p>Subtotal: € ${total.toLocaleString()}</p>
            <p>Discount (5%): -€ ${discount.toFixed(2)}</p>
            <p><strong>Total Price: € ${totalAfterDiscount.toLocaleString()}</strong></p>`;
        document.getElementById("order-summary").classList.remove("d-none");
    });
});