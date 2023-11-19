const mysql = require('mysql2');
const express = require('express');
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'express',
    database: 'banque'
});

// Cette fonction permet de lister les comptes de la base de donnees
function listCompte() {
    return new Promise((resolve, reject) => {
        // Simple requete
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
// Cette fonction permet de creer un comptes dans la base de donnees
function createCompte(numcompte, prenom, nom, solde) {
    connexion.query("INSERT INTO compte(numcompte, prenom, nom, solde) VALUES(?,?,?,?)",
        [numcompte, prenom, nom, solde],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Insertion reussi !");
            }
        });
}
// Cette fonction permet de modifier le solde d'un compte dans la base de donnees
function updateCompte(numcompte, nouveauSolde) {
    connexion.query("UPDATE compte SET solde = ? WHERE numcompte = ?",
        [nouveauSolde, numcompte],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Modification reussi !");
            }
        });
}
// Cette fonction permet de supprimer un comptes dans la base de donnees
function deleteCompte(numcompte) {
    connexion.query("DELETE FROM compte WHERE numcompte = ?",
        [numcompte],
        (erreurs, resultats, champs) => {
            if (erreurs) {
                console.log("Une erreur s'est produite: " + erreurs);
            }
            else {
                console.log("Suppression reussi !");
            }
        });
}


const app = express();
const port = 3030;

app.get("/", async (requete, reponse) => {
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    let donnees = await listCompte();

    page = page.concat("<table><tr><th>Numero compte</th><th>Prenom</th><th>Nom</th><th>Solde</th></tr>");
    donnees.forEach(donnee => {
        page = page.concat("<tr><td>" + donnee.numcompte + "</td><td>" + donnee.prenom + "</td><td>" + donnee.nom + "</td><td>" + donnee.solde + "</td></tr>");
    });
    page = page.concat("</table></body></html>");

    reponse.send(page);

});

app.listen(port, () => {
    console.log("Le seveur tourne sur l'adresse: http://localhost:" + port + "/");
});