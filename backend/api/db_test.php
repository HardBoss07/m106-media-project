<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing Database Connection...<br>";

$host = "localhost";
$user = "root";
$password = "";
$dbname = "media_host_db";

$start = microtime(true);
$conn = mysqli_init();
mysqli_options($conn, MYSQLI_OPT_CONNECT_TIMEOUT, 5); // 5 second timeout

if (!@mysqli_real_connect($conn, $host, $user, $password, $dbname)) {
    echo "Connection Failed: " . mysqli_connect_error() . "<br>";
} else {
    echo "Connection Successful!<br>";
    $res = mysqli_query($conn, "SELECT COUNT(*) as cnt FROM media");
    $row = mysqli_fetch_assoc($res);
    echo "Media items in DB: " . $row['cnt'] . "<br>";
    mysqli_close($conn);
}

$end = microtime(true);
echo "Time taken: " . round($end - $start, 4) . " seconds<br>";
?>
