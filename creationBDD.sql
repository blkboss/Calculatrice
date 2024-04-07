-- Création de la base de données
CREATE DATABASE calculatrice;

-- Création de la table des historiques
CREATE TABLE historique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation VARCHAR(255) NOT NULL,
    resultat VARCHAR(255) NOT NULL,
    date_heure DATETIME NOT NULL
);

--Creation de l'utilisateur et affectation de ses privileges .

CREATE USER 'Esdras'@'localhost' IDENTIFIED BY 'blk10JESUS';

GRANT SELECT, INSERT, UPDATE, DELETE ON `calculatrice`.* TO 'Esdras'@'localhost';
