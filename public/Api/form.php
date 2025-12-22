<?php
session_start();
header('Content-Type: application/json');

// Include DB connection
include 'db.php';

// Helper function to return JSON and exit
function sendResponse($status, $message = "", $data = []) {
    echo json_encode(array_merge(["status" => $status, "message" => $message], $data));
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse("error", "Invalid request method");
}

// Retrieve POST data safely
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Minimal validation
if (!$name || !$email || !$password) {
    sendResponse("error", "Missing required fields");
}

// Hash password
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
if (!$stmt) {
    sendResponse("error", "DB prepare failed: " . $conn->error);
}

// Bind parameters and execute
$stmt->bind_param("sss", $name, $email, $passwordHash);
if (!$stmt->execute()) {
    sendResponse("error", "DB execute failed: " . $stmt->error);
}

// Success: store in session and return JSON
$_SESSION['user_id'] = $stmt->insert_id;
$_SESSION['name'] = $name;
$_SESSION['email'] = $email;

sendResponse("success", "User created successfully", [
    "user_id" => $stmt->insert_id,
    "name" => $name,
    "email" => $email
]);
?>
