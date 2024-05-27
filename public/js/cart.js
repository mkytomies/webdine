let cart = {};

function getCart() {
    cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
} 

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

fetch('../src/get_menu.php')
 .then(response => {
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
 })
 .then(cartItems => {
    cart = getCart();
    const filteredItems = filterMenuItems(cartItems, cart);
    displayCart(filteredItems);
 })
 .catch(error => {
    console.error("Error fetching menu items: ", error);
 })

function filterMenuItems(cartItems, cart) {
    return cartItems.filter(item => cart.hasOwnProperty(item.id))
}

function displayCart(cartItems) {
    const cartDiv = document.getElementById('menu');
    cartItems.forEach(item => {
        // Div for menu item
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        // Create image div for the menu item 
        const itemImageDiv = document.createElement('div');
        itemImageDiv.classList.add('menu-img')
        const itemImage = document.createElement('img');
        itemImage.src = '../public/' + item.image;
        itemImage.alt = item.name;
        itemImageDiv.appendChild(itemImage);

        // Text div with name, description and price + buttons div inside
        const itemTextDiv = document.createElement('div');
        itemTextDiv.classList.add('menu-text');

        // Create name, desc and price elements
        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        const itemDesc = document.createElement('p');
        itemDesc.classList.add('desc');
        itemDesc.textContent = item.description;
        const itemPrice = document.createElement('p');
        itemPrice.classList.add('price')
        itemPrice.textContent = item.price + '€';

        // Append them to the div
        itemTextDiv.appendChild(itemName);
        itemTextDiv.appendChild(itemDesc);
        itemTextDiv.appendChild(itemPrice);

        // Div for buttons
        const itemButtonsDiv = document.createElement('div');
        itemButtonsDiv.classList.add('buttons-div');

        // Create div for + and - buttons 
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        // Create + and - buttons & paragraph for amount
        const minus = document.createElement('button');
        minus.classList.add('minus');
        minus.textContent = '-';
        const amount = document.createElement('p');
        amount.textContent = "0";
        const plus = document.createElement('button');
        plus.classList.add('plus');
        plus.textContent = '+';

        // Add event listener for -
        minus.addEventListener('click', () => {
            const prevCart = getCart();
            const updatedCart = { ...prevCart };

            if (updatedCart[item.id] && updatedCart[item.id] > 0) {
                updatedCart[item.id] -= 1;

                if (updatedCart[item.id] === 0) {
                    delete updatedCart[item.id];
                }
            }

            setCart(updatedCart);
            updateAmount();
        });

        // Add event listener for +
        plus.addEventListener('click', () => {
            const prevCart = getCart();
            const updatedCart = { ...prevCart };

            updatedCart[item.id] = (updatedCart[item.id] || 0) + 1;

            setCart(updatedCart);
            updateAmount();
        });
        
        // Append those to the buttons div
        buttons.appendChild(minus);
        buttons.appendChild(amount);
        buttons.appendChild(plus);

        // Div for delete button
        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.classList.add('delete-button');

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = '🗑️';

        // Add event listener for delete button
        deleteButton.addEventListener('click', () => {
            const prevCart = getCart();
            const updatedCart = { ...prevCart };

            if (updatedCart[item.id] && updatedCart[item.id] > 0) {
                    delete updatedCart[item.id];
            }

            setCart(updatedCart);
            updateAmount();
        })

        // Function to update the amount in the paragraph
        function updateAmount() {
            const cart = getCart();
            amount.textContent = cart[item.id] || 0;
        }

        // Initial update of the amount on page load
        updateAmount();

        // Append delete button to its div
        deleteButtonDiv.appendChild(deleteButton);

        // Append both button divs to the main button div
        itemButtonsDiv.appendChild(buttons);
        itemButtonsDiv.appendChild(deleteButtonDiv);

        // Append main button div to the text div
        itemTextDiv.appendChild(itemButtonsDiv);

        // Append image and text divs to the menuItem div 
        menuItem.appendChild(itemImageDiv);
        menuItem.appendChild(itemTextDiv);

        // Append menuItem to the menu
        cartDiv.appendChild(menuItem);
    })
}