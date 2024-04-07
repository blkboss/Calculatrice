<?php

// Informations de connexion à la base de données
$host = 'localhost';
$dbname = 'calculatrice';
$username = 'Esdras';
$password = 'blk10JESUS';

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    die();
}

// Préparation de la requête SQL
$stmt = $pdo->query("SELECT * FROM historique ORDER BY date_heure DESC");




// Initialisation d'un tableau pour stocker les opérations et les résultats
$historiqueData = array();

// Parcours des résultats et stockage dans le tableau
while ($historique = $stmt->fetch()) {
    $historiqueData[] = array(
        
        'operation' => $historique['operation'],
        'resultat' => $historique['resultat'],
        'date_heure' => $historique['date_heure']
    );
}

// Si l'historique est vide, retourner un tableau vide
if (empty($historiqueData)) {
    echo "[]";
} else {
    // Sinon, envoyer les données à JavaScript au format JSON
    echo json_encode($historiqueData);

}



?>

