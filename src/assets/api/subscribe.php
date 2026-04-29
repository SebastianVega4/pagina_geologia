<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejo de peticiones pre-flight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Obtener los datos enviados
$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->email) && filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    $email = $data->email;
    $fecha = date("Y-m-d H:i:s");
    
    // Ruta del archivo donde se guardarán los correos
    // Se guardará en la misma carpeta que el script
    $archivo = "lista_suscritos.txt";
    
    // Formato de línea: FECHA | EMAIL
    $linea = "[$fecha] $email" . PHP_EOL;
    
    // Escribir en el archivo (FILE_APPEND para no borrar lo anterior)
    if (file_put_contents($archivo, $linea, FILE_APPEND | LOCK_EX)) {
        echo json_encode(["success" => true, "message" => "Email guardado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al escribir en el servidor"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email no válido"]);
}
?>
