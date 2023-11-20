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

// Initialisation d'Express
const app = express();
const port = 3030;

// Middleware pour analyser les données envoyées au format: application/json
app.use(express.json());
// Middleware pour analyser les données envoyées depuis un formulaire: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Définition de la route principale ("/")
app.get("/", async (requete, reponse) => {
    // Construction de la page HTML
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body><a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a>";
    let donnees = await listCompte();

    page = page.concat("<table><tr><th>Numero compte</th><th>Prenom</th><th>Nom</th><th>Solde</th></tr>");
    donnees.forEach(donnee => {
        page = page.concat("<tr><td>" + donnee.numcompte + "</td><td>" + donnee.prenom + "</td><td>" + donnee.nom + "</td><td>" + donnee.solde + "</td></tr>");
    });
    page = page.concat("</table></body></html>");

    // Envoi de la page au client
    reponse.send(page);
});

// Définition de la route "/formulaire" pour afficher un formulaire de création de compte
app.get("/formulaire", (requete, reponse) => {
    // Construction de la page HTML avec un formulaire
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    page = page.concat("<a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a> <form method='post' action='/comptes'>Numero du compte<input name='numcompte' type='text'><br>Prenom<input name='prenom' type='text'><br>Nom<input name='nom' type='text'><br>Solde<input name='solde' type='text'><br><input type='submit' value='Créer'></form></body></html>");
    reponse.send(page);
});

// Définition de la route POST "/comptes" pour traiter le formulaire de création de compte
app.post("/comptes", (requete, reponse) => {
    // Appel de la fonction pour créer un compte avec les données du formulaire
    createCompte(requete.body.numcompte, requete.body.prenom, requete.body.nom, requete.body.solde);
    // Redirection vers la route "/"
    reponse.redirect("/");
});

// Creer les autres routes pour la modification et la suppression

// Démarrage du serveur Express
app.listen(port, () => {
    console.log("Le serveur tourne sur l'adresse: http://localhost:" + port + "/");
});
