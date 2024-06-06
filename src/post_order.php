<?php
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $street = $_POST["street"];
    $postalCode = $_POST["postalCode"];
    $city = $_POST["city"];
    $items = $_POST["cart"]; 

    $sql = "INSERT INTO orders (customer_first_name, customer_last_name, customer_email, customer_street, customer_postal_code, customer_city, items) VALUES ('$firstName', '$lastName', '$email', '$street', '$postalCode', '$city', '$items')";

    if (mysqli_query($conn, $sql)) {
        // Clear cart from localStorage
        echo "<script>localStorage.removeItem('cart');</script>";
    } else {
        echo "Something went wrong: " . mysqli_error($conn);
    }
    echo '<script>
        alert("Order accepted!");
        window.location.href = "../public/index.html";
        </script>';
}
?>
