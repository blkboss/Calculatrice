
<?php
// Réception de la chaîne d'opération depuis le JavaScript
$operation = $_POST['ecran'];


// Utilisation de explode pour créer un tableau d'opérandes et d'opérateurs
$parties = explode(' ', $operation);

// Initialisation du résultat avec la première opérande
$resultat = array_shift($parties);



 // verifions que  $resultat est un nombre
$resultat = intval($resultat); 


// Parcours du tableau et exécution des calculs

for ($i = 0; $i < count($parties); $i += 2) {

    $operateur = $parties[$i];

    $secondOperande = intval($parties[$i + 1]);
    
    switch ($operateur) {
        case '+':
            $resultat += $secondOperande;
            break;
        case '-':
            $resultat -= $secondOperande;
            break;
        case '*':
            $resultat *= $secondOperande;
            break;
        case '/':
            if ($secondOperande == 0) {
                $resultat = "Erreur : Division par zéro";
                break;
            }
            $resultat /= $secondOperande;
            break;
        default:
            // Gérer les opérateurs inconnus ou non pris en charge
            break;
    }
}


/* Les lignes (44 - 56) contiennent toutes les informations necessaires pour  la connexion à la base de données ainsi que 
 la maniere dont phpMyadmin se connecte à la base de donnée. */


// Informations de connexion à la base de données
$host = 'localhost';
$dbname = 'calculatrice';
$username = 'Esdras';
$password = 'blk10JESUS';

// La maniere dont php Myadmin se connecte à la base de donnée . 
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    die();
}



// Les lignes (63 - 69)  se chargent de récuperer le calcul et le resultat , ensuite les envoie dans la base de données.

// Préparation de la requête SQL pour envoyer  le calcul et le resultat dans la base de données.

$stmt = $pdo->prepare("INSERT INTO historique (operation, resultat, date_heure) VALUES (:operation, :resultat, NOW())");

// Exécution de la requête avec les paramètres
$stmt->execute([
  ':operation' => $operation,
  ':resultat' => $resultat,
]);


// Envoi du résultat au JavaScript
echo $resultat;



?>

