// Importation des modules nécessaires
const mysql = require('mysql2');

// Connexion à la base de données MySQL
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'express',
    database: 'banque'
});

// Fonction asynchrone qui retourne une promesse pour lister les comptes de la base de données
function listCompte() {
    return new Promise((resolve, reject) => {
        // Requête SQL pour sélectionner tous les enregistrements de la table 'compte'
        connexion.query("SELECT * FROM compte",
            (erreurs, resultats, champs) => {
                if (erreurs) {
                    console.log("Nous avons des erreurs !");
                    reject(erreurs);
                }
                else {
                    console.log("Donnees recuperees !");
                    resolve(resultats);
                }
            });
    });
}

// Fonction pour créer un compte dans la base de données
function createCompte(numcompte, prenom, nom, solde) {
    // Requête SQL pour l'insertion d'un nouvel enregistrement dans la table 'compte'
    connexion.query("INSERT INTO compte(numcompte, prenom, nom, solde) VALUES(?,?,?,?)",
        [numcompte, prenom, nom, solde],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Insertion reussie !");
            }
        });
}

// Fonction pour modifier le solde d'un compte dans la base de données
function updateCompte(numcompte, nouveauSolde) {
    // Requête SQL pour mettre à jour le solde d'un enregistrement dans la table 'compte'
    connexion.query("UPDATE compte SET solde = ? WHERE numcompte = ?",
        [nouveauSolde, numcompte],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Modification reussie !");
            }
        });
}

// Fonction pour supprimer un compte de la base de données
function deleteCompte(numcompte) {
    // Requête SQL pour supprimer un enregistrement de la table 'compte'
    connexion.query("DELETE FROM compte WHERE numcompte = ?",
        [numcompte],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Suppression reussie !");
            }
        });
}

// Exportation des fonctions pour les rendre accessibles depuis d'autres fichiers
module.exports = {
    listCompte,
    createCompte,
    updateCompte,
    deleteCompte
}