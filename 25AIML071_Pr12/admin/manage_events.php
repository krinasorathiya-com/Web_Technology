<?php
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../config/auth.php";
require_admin();
$allowedTypes = ["image/jpeg"=>"jpg", "image/png"=>"png"];
$uploadDir = __DIR__ . "/../uploads/events/";
$notice = ""; $error = "";
function clean($v): string { return trim((string)$v); }
function savePoster(array $file, array $allowedTypes, string $uploadDir): ?string {
    if (($file["error"] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return null;
    if ($file["error"] !== UPLOAD_ERR_OK) throw new RuntimeException("Poster upload failed.");
    if ($file["size"] > 2 * 1024 * 1024) throw new RuntimeException("Poster must be 2 MB or smaller.");
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file["tmp_name"]);
    if (!isset($allowedTypes[$mime])) throw new RuntimeException("Only JPG and PNG poster images are allowed.");
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) throw new RuntimeException("Cannot create upload directory.");
    $filename = bin2hex(random_bytes(16)) . "." . $allowedTypes[$mime];
    if (!move_uploaded_file($file["tmp_name"], $uploadDir . $filename)) throw new RuntimeException("Could not save poster.");
    return $filename;
}
function removePoster(?string $filename, string $uploadDir): void {
    if ($filename && basename($filename) === $filename && is_file($uploadDir.$filename)) unlink($uploadDir.$filename);
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    verify_csrf();
    $action = $_POST["action"] ?? "";
    try {
        if ($action === "delete") {
            $id = (int)($_POST["id"] ?? 0);
            $stmt = $conn->prepare("SELECT poster FROM events WHERE id=?"); $stmt->bind_param("i",$id); $stmt->execute();
            $old = $stmt->get_result()->fetch_assoc();
            if ($old) {
                $del = $conn->prepare("DELETE FROM events WHERE id=?"); $del->bind_param("i",$id); $del->execute();
                removePoster($old["poster"],$uploadDir); $notice = "Event deleted successfully.";
            }
        } elseif ($action === "save") {
            $id = (int)($_POST["id"] ?? 0);
            $title = clean($_POST["title"] ?? ""); $description = clean($_POST["description"] ?? "");
            $eventDate = $_POST["event_date"] ?? ""; $venue = clean($_POST["venue"] ?? "");
            $category = clean($_POST["category"] ?? ""); $status = $_POST["status"] ?? "Open";
            if ($title === "" || $description === "" || $eventDate === "" || $venue === "" || $category === "") throw new RuntimeException("Please complete all required fields.");
            if (!in_array($status,["Open","Closed"],true)) throw new RuntimeException("Invalid event status.");
            $poster = savePoster($_FILES["poster"] ?? [],$allowedTypes,$uploadDir);
            if ($id > 0) {
                $stmt=$conn->prepare("SELECT poster FROM events WHERE id=?"); $stmt->bind_param("i",$id); $stmt->execute();
                $old=$stmt->get_result()->fetch_assoc(); if (!$old) throw new RuntimeException("Event not found.");
                $newPoster = $poster ?? $old["poster"];
                $stmt=$conn->prepare("UPDATE events SET title=?,description=?,event_date=?,venue=?,category=?,status=?,poster=? WHERE id=?");
                $stmt->bind_param("sssssssi",$title,$description,$eventDate,$venue,$category,$status,$newPoster,$id); $stmt->execute();
                if ($poster) removePoster($old["poster"],$uploadDir);
                $notice="Event updated successfully.";
            } else {
                $stmt=$conn->prepare("INSERT INTO events(title,description,event_date,venue,category,status,poster) VALUES(?,?,?,?,?,?,?)");
                $stmt->bind_param("sssssss",$title,$description,$eventDate,$venue,$category,$status,$poster); $stmt->execute();
                $notice="Event added successfully.";
            }
        }
    } catch (Throwable $e) { $error = $e->getMessage(); }
}
$edit = null;
if (isset($_GET["edit"])) {
    $id=(int)$_GET["edit"]; $stmt=$conn->prepare("SELECT * FROM events WHERE id=?"); $stmt->bind_param("i",$id); $stmt->execute(); $edit=$stmt->get_result()->fetch_assoc();
}
$filter = $_GET["status"] ?? "All";
if (in_array($filter,["Open","Closed"],true)) {
    $stmt=$conn->prepare("SELECT * FROM events WHERE status=? ORDER BY event_date DESC"); $stmt->bind_param("s",$filter); $stmt->execute(); $events=$stmt->get_result();
} else $events=$conn->query("SELECT * FROM events ORDER BY event_date DESC");
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage Events | StudentHub</title><link rel="stylesheet" href="style.css"></head><body>
<header class="top"><a href="../index.html">StudentHub</a><nav><span>Welcome, <?= htmlspecialchars($_SESSION["admin_name"] ?? "Admin") ?></span> · <a href="logout.php">Logout</a> · <a href="../events.php">Public events</a></nav></header>
<main class="container"><h1>Event Management</h1><p>Admin dashboard · Add, view, update and delete campus events.</p>
<?php if($notice): ?><p class="notice"><?= htmlspecialchars($notice) ?></p><?php endif; ?><?php if($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>
<section class="panel"><h2><?= $edit ? "Update Event" : "Add New Event" ?></h2>
<form method="post" enctype="multipart/form-data"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>"><input type="hidden" name="action" value="save"><input type="hidden" name="id" value="<?= (int)($edit["id"] ?? 0) ?>">
<div class="form-grid"><label>Event title<input name="title" required value="<?= htmlspecialchars($edit["title"] ?? "") ?>"></label><label>Event date<input type="date" name="event_date" required value="<?= htmlspecialchars($edit["event_date"] ?? "") ?>"></label><label>Venue<input name="venue" required value="<?= htmlspecialchars($edit["venue"] ?? "") ?>"></label><label>Category<select name="category" required><?php foreach(["Technical","Cultural","Sports","Workshop","Other"] as $c): ?><option value="<?= $c ?>" <?= (($edit["category"] ?? "")===$c)?"selected":"" ?>><?= $c ?></option><?php endforeach; ?></select></label><label>Status<select name="status"><option <?= (($edit["status"] ?? "Open")==="Open")?"selected":"" ?>>Open</option><option <?= (($edit["status"] ?? "")==="Closed")?"selected":"" ?>>Closed</option></select></label><label>Poster (JPG/PNG, max 2 MB)<input type="file" name="poster" accept=".jpg,.jpeg,.png,image/jpeg,image/png"></label></div>
<label>Description<textarea name="description" rows="4" required><?= htmlspecialchars($edit["description"] ?? "") ?></textarea></label>
<?php if(!empty($edit["poster"])): ?><p>Current poster: <img class="thumb" src="../uploads/events/<?= rawurlencode($edit["poster"]) ?>" alt="Current event poster"></p><?php endif; ?>
<button type="submit"><?= $edit ? "Update Event" : "Add Event" ?></button> <?php if($edit): ?><a class="secondary" href="manage_events.php">Cancel edit</a><?php endif; ?></form></section>
<section class="panel"><div class="heading-row"><h2>All Events</h2><form method="get"><label class="inline">Filter status <select name="status" onchange="this.form.submit()"><option>All</option><option <?= $filter==="Open"?"selected":"" ?>>Open</option><option <?= $filter==="Closed"?"selected":"" ?>>Closed</option></select></label></form></div>
<div class="table-wrap"><table><thead><tr><th>Poster</th><th>Title</th><th>Date</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>
<?php if($events->num_rows===0): ?><tr><td colspan="6">No events found.</td></tr><?php endif; ?>
<?php while($row=$events->fetch_assoc()): ?><tr><td><?php if($row["poster"]): ?><img class="thumb" src="../uploads/events/<?= rawurlencode($row["poster"]) ?>" alt="Poster for <?= htmlspecialchars($row["title"]) ?>"><?php else: ?>—<?php endif; ?></td><td><?= htmlspecialchars($row["title"]) ?></td><td><?= htmlspecialchars($row["event_date"]) ?></td><td><?= htmlspecialchars($row["category"]) ?></td><td><span class="status"><?= htmlspecialchars($row["status"]) ?></span></td><td><a href="?edit=<?= (int)$row["id"] ?>">Edit</a><form class="inline-form" method="post" onsubmit="return confirm('Delete this event?')"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= (int)$row["id"] ?>"><button class="danger" type="submit">Delete</button></form></td></tr><?php endwhile; ?>
</tbody></table></div></section></main></body></html>
