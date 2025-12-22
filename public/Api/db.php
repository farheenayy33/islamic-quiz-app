<?php
$servername = "localhost";  
$username = "root";         
$password = "";             
$dbname = "islamic-quiz-app"; 
$port = 3307; // your MySQL port

// Create connection with port
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    // Return JSON error instead of HTML
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "error",
        "message" => "DB connection failed: " . $conn->connect_error
    ]);
    exit; // stop further execution
}
?>
