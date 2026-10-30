<?php
require_once __DIR__ . "/config/database.php";
$status = $_GET["status"] ?? "All";
if (in_array($status,["Open","Closed"],true)) {
    $stmt=$conn->prepare("SELECT * FROM events WHERE status=? ORDER BY event_date ASC"); $stmt->bind_param("s",$status); $stmt->execute(); $events=$stmt->get_result();
} else $events=$conn->query("SELECT * FROM events ORDER BY event_date ASC");
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Events | StudentHub</title><link rel="stylesheet" href="admin/style.css"></head><body>
<header class="top"><a href="index.html">StudentHub</a><nav><a href="index.html">Home</a> · <a href="admin/login.php">Admin</a></nav></header>
<main class="container"><h1>Upcoming StudentHub Events</h1><form method="get"><label class="inline">Event status <select name="status"><option>All</option><option <?= $status==="Open"?"selected":"" ?>>Open</option><option <?= $status==="Closed"?"selected":"" ?>>Closed</option></select></label><button>Filter</button></form>
<div class="cards"><?php if($events->num_rows===0): ?><p>No events available.</p><?php endif; ?><?php while($e=$events->fetch_assoc()): ?><article class="event-card"><?php if($e["poster"]): ?><img src="uploads/events/<?= rawurlencode($e["poster"]) ?>" alt="Poster for <?= htmlspecialchars($e["title"]) ?>"><?php endif; ?><div><span class="status"><?= htmlspecialchars($e["status"]) ?></span><h2><?= htmlspecialchars($e["title"]) ?></h2><p><?= nl2br(htmlspecialchars($e["description"])) ?></p><p><strong>Date:</strong> <?= htmlspecialchars($e["event_date"]) ?></p><p><strong>Venue:</strong> <?= htmlspecialchars($e["venue"]) ?></p><p><strong>Category:</strong> <?= htmlspecialchars($e["category"]) ?></p></div></article><?php endwhile; ?></div></main></body></html>
