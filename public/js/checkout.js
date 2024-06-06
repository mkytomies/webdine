let cart = {};

function getCart() {
    cart = localStorage.getItem('cart');
    document.getElementById('cart').value = cart;
    return cart ? JSON.parse(cart) : {};
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
        // Div for menu items
        const menuItem = document.createElement('div');
        menuItem.classList.add('item');

        // Create image div for the menu item 
        const itemImageDiv = document.createElement('div');
        itemImageDiv.classList.add('item-img')
        const itemImage = document.createElement('img');
        itemImage.src = '../public/' + item.image;
        itemImage.alt = item.name;
        itemImageDiv.appendChild(itemImage);

        // Text div with name, price and amount
        const itemTextDiv = document.createElement('div');
        itemTextDiv.classList.add('item-text');

        // Create name, price and amount elements
        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        const amount = document.createElement('p');
        amount.textContent = "X";
        const itemPrice = document.createElement('p');
        itemPrice.classList.add('price')
        itemPrice.textContent = item.price + '€';

        // Append them to the div
        itemTextDiv.appendChild(itemName);
        itemTextDiv.appendChild(amount);
        itemTextDiv.appendChild(itemPrice);

        // Append image and text divs to the menuItem div 
        menuItem.appendChild(itemImageDiv);
        menuItem.appendChild(itemTextDiv);

        // Append menuItem to the menu
        cartDiv.appendChild(menuItem);
    })
}