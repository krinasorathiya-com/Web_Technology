<?php
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../config/auth.php";
$count = (int)$conn->query("SELECT COUNT(*) AS total FROM admins")->fetch_assoc()["total"];
$message = "";
if ($_SERVER["REQUEST_METHOD"] === "POST" && $count === 0) {
    verify_csrf();
    $name = trim($_POST["name"] ?? "");
    $email = strtolower(trim($_POST["email"] ?? ""));
    $password = $_POST["password"] ?? "";
    if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
        $message = "Enter a name, valid email, and password of at least 8 characters.";
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO admins (name,email,password) VALUES (?,?,?)");
        $stmt->bind_param("sss", $name, $email, $hash);
        $stmt->execute();
        $message = "Admin account created. Delete setup.php now, then sign in.";
        $count = 1;
    }
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>StudentHub Admin Setup</title><link rel="stylesheet" href="style.css"></head><body>
<main class="auth"><h1>StudentHub Admin Setup</h1>
<?php if ($message): ?><p class="notice"><?= htmlspecialchars($message) ?></p><?php endif; ?>
<?php if ($count > 0): ?><p>An admin account already exists. <a href="login.php">Go to admin login</a>.</p>
<?php else: ?><form method="post"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
<label>Admin name<input name="name" required></label><label>Email<input type="email" name="email" required></label><label>Password (minimum 8 characters)<input type="password" name="password" minlength="8" required></label><button>Create admin account</button></form><?php endif; ?>
</main></body></html>
