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

// Préparation de la requête SQL pour supprimer l'historique
$stmt = $pdo->prepare("DELETE FROM historique");

// Exécution de la requête
$stmt->execute();

// Envoi d'une réponse au script JavaScript
echo 'success';

?>
