<?php
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../config/auth.php";
if (!empty($_SESSION["admin_id"])) { header("Location: manage_events.php"); exit; }
$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    verify_csrf();
    $email = strtolower(trim($_POST["email"] ?? ""));
    $password = $_POST["password"] ?? "";
    $stmt = $conn->prepare("SELECT id,name,password FROM admins WHERE email=? LIMIT 1");
    $stmt->bind_param("s", $email); $stmt->execute();
    $admin = $stmt->get_result()->fetch_assoc();
    if ($admin && password_verify($password, $admin["password"])) {
        session_regenerate_id(true);
        $_SESSION["admin_id"] = (int)$admin["id"];
        $_SESSION["admin_name"] = $admin["name"];
        header("Location: manage_events.php"); exit;
    }
    $error = "Invalid email or password.";
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Login | StudentHub</title><link rel="stylesheet" href="style.css"></head><body>
<main class="auth"><h1>StudentHub Admin Login</h1><?php if($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>
<form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>"><label>Email<input type="email" name="email" required></label><label>Password<input type="password" name="password" required></label><button>Login</button></form><p><a href="../events.php">View public events</a></p></main></body></html>
