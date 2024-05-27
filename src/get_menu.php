<?php
require_once "config.php";

$sql = "SELECT * FROM items";
$results = mysqli_query($conn, $sql);

$menuItems = array();

if(mysqli_num_rows($results) > 0) {
    while($row = mysqli_fetch_assoc($results)) {
        $menuItems[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($menuItems);
?>