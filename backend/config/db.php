<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "media_host_db";

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset to utf8mb4 for German special characters
mysqli_set_charset($conn, "utf8mb4");
?>
