<?php
if (session_status() === PHP_SESSION_NONE) session_start();
function require_admin(): void {
    if (empty($_SESSION["admin_id"])) {
        header("Location: login.php");
        exit;
    }
}
function csrf_token(): string {
    if (empty($_SESSION["csrf_token"])) $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    return $_SESSION["csrf_token"];
}
function verify_csrf(): void {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $token = $_POST["csrf_token"] ?? "";
        if (!hash_equals($_SESSION["csrf_token"] ?? "", $token)) {
            http_response_code(403);
            exit("Invalid request token. Please go back and try again.");
        }
    }
}
