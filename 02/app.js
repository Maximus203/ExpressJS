// Importation des modules nécessaires
const mysql = require('mysql2');
const express = require('express');

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

// Fonction pour mettre à jour le solde d'un compte dans la base de données
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

// Initialisation d'Express
const app = express();
const port = 3030;

// Définition de la route principale ("/")
app.get("/", async (requete, reponse) => {
    // Construction de la page HTML
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    let donnees = await listCompte();

    page = page.concat("<table><tr><th>Numero compte</th><th>Prenom</th><th>Nom</th><th>Solde</th></tr>");
    donnees.forEach(donnee => {
        page = page.concat("<tr><td>" + donnee.numcompte + "</td><td>" + donnee.prenom + "</td><td>" + donnee.nom + "</td><td>" + donnee.solde + "</td></tr>");
    });
    page = page.concat("</table></body></html>");

    // Envoi de la page au client
    reponse.send(page);
});


// Implementer la route pour afficher le formulaire de creation d'un compte: GET
// Implementer la route pour afficher le formulaire de modification d'un compte: GET
// Implementer la route pour sauvegarder un compte: POST
// Implementer la route pour mettre a jour un compte: POST
// Implementer la route pour supprimer un compte: (Rechercher la methode pour supprimer et commenter le pourquoi de l'utilisation)

// Démarrage du serveur Express
app.listen(port, () => {
    console.log("Le serveur tourne sur l'adresse: http://localhost:" + port + "/");
});
