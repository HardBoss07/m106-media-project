<?php
header("Access-Control-Allow-Origin: http://localhost:4000");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/db.php';

$type = isset($_GET['type']) ? $_GET['type'] : '';
$query = isset($_GET['query']) ? $_GET['query'] : '';

// Map localized types to database names
$type_map = [
    'Foto' => 'image',
    'Video' => 'video',
    'Sound' => 'audio'
];
$db_type = isset($type_map[$type]) ? $type_map[$type] : '';

// Prepare base SQL
$sql = "SELECT DISTINCT m.mediaID, m.title, m.description, m.file_path, mt.name as type_name, 
        GROUP_CONCAT(c.name SEPARATOR ' > ') as signature
        FROM media m
        JOIN media_type mt ON m.media_typeID = mt.media_typeID
        LEFT JOIN media_category mc ON m.mediaID = mc.mediaID
        LEFT JOIN category c ON mc.categoryID = c.categoryID";

$where_clauses = [];
$params = [];
$types = "";

if ($db_type) {
    $where_clauses[] = "mt.name = ?";
    $params[] = $db_type;
    $types .= "s";
}

if ($query) {
    // Basic text search in title or description
    // If query contains ' > ', handle it as a specific metadata/signature filter
    if (str_contains($query, '>')) {
        $cats = array_map('trim', explode('>', $query));
        $placeholders = implode(',', array_fill(0, count($cats), '?'));
        $where_clauses[] = "m.mediaID IN (
            SELECT mc2.mediaID FROM media_category mc2 
            JOIN category c2 ON mc2.categoryID = c2.categoryID 
            WHERE c2.name IN ($placeholders)
        )";
        foreach ($cats as $cat) {
            $params[] = $cat;
            $types .= "s";
        }
    } else {
        $where_clauses[] = "(m.title LIKE ? OR m.description LIKE ? OR c.name LIKE ?)";
        $search_term = "%$query%";
        $params[] = $search_term;
        $params[] = $search_term;
        $params[] = $search_term;
        $types .= "sss";
    }
}

if (!empty($where_clauses)) {
    $sql .= " WHERE " . implode(" AND ", $where_clauses);
}

$sql .= " GROUP BY m.mediaID";

$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    if (!empty($params)) {
        mysqli_stmt_bind_param($stmt, $types, ...$params);
    }
    
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $media_items = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $media_items[] = [
            'id' => (string)$row['mediaID'],
            'title' => $row['title'],
            'description' => $row['description'],
            'type' => $row['type_name'],
            'signature' => $row['signature'] ?: '',
            'url' => $row['file_path'],
            'thumbnail' => $row['file_path'] // Assuming for now, or use placeholder logic
        ];
    }

    echo json_encode($media_items);
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "SQL Prepare Error"]);
}

mysqli_close($conn);
?>
