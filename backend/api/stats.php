<?php
// Prevent any PHP errors from leaking into the output and breaking JSON
// But keep reporting to allow catch to work
error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// We'll wrap everything in a try-catch-like block manually
try {
    if (!@include_once('../config/db.php')) {
        throw new Exception("Database configuration file not found at " . realpath('../config/db.php'));
    }

    if (!isset($conn) || !$conn) {
        throw new Exception("Database connection failed: " . mysqli_connect_error());
    }

    $stats = [];

    // 1. Gesamtzahl der Medien (COUNT)
    $sql_total = "SELECT COUNT(*) as total_count FROM media";
    $result_total = mysqli_query($conn, $sql_total);
    if (!$result_total) {
        throw new Exception("Media count query failed: " . mysqli_error($conn) . " (SQL: $sql_total)");
    }
    $stats['total_media'] = (int)mysqli_fetch_assoc($result_total)['total_count'];

    // 2. Speicherverbrauch (SUM & AVG) - Handling potential missing column 'file_size_kb'
    $sql_size = "SELECT SUM(file_size_kb) as total_size_kb, AVG(file_size_kb) as avg_size_kb FROM media";
    $result_size = @mysqli_query($conn, $sql_size);

    if ($result_size) {
        $row_size = mysqli_fetch_assoc($result_size);
        $stats['total_size_mb'] = round(($row_size['total_size_kb'] ?? 0) / 1024, 2);
        $stats['avg_size_kb'] = round($row_size['avg_size_kb'] ?? 0, 2);
    } else {
        // Fallback if column does not exist yet
        $stats['total_size_mb'] = 0;
        $stats['avg_size_kb'] = 0;
        $stats['warning'] = "Column file_size_kb missing. Please re-import main.sql.";
    }

    // 3. Medien pro Typ (COUNT mit GROUP BY)
    $sql_types = "SELECT mt.name, COUNT(m.mediaID) as count 
                  FROM media_type mt 
                  LEFT JOIN media m ON mt.media_typeID = m.media_typeID 
                  GROUP BY mt.media_typeID";
    $result_types = mysqli_query($conn, $sql_types);

    $stats['by_type'] = [
        "video" => 0,
        "image" => 0,
        "audio" => 0
    ];

    if ($result_types) {
        while ($row = mysqli_fetch_assoc($result_types)) {
            $name = strtolower($row['name']);
            // Map common names
            if ($name === 'foto' || $name === 'image') $name = 'image';
            if ($name === 'sound' || $name === 'audio') $name = 'audio';
            if ($name === 'video') $name = 'video';
            
            if (isset($stats['by_type'][$name])) {
                $stats['by_type'][$name] = (int)$row['count'];
            }
        }
    }

    // 4. Neuestes Upload-Datum (MAX)
    $sql_latest = "SELECT MAX(upload_date) as latest_upload FROM media";
    $result_latest = mysqli_query($conn, $sql_latest);
    $stats['latest_upload'] = $result_latest ? mysqli_fetch_assoc($result_latest)['latest_upload'] : null;

    echo json_encode($stats, JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Internal Server Error",
        "message" => $e->getMessage(),
        "trace" => $e->getTraceAsString()
    ], JSON_PRETTY_PRINT);
}
?>
