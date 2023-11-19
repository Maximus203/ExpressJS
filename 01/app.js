const mysql = require('mysql2');

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



async function main() {
    try {
        let donnees = await listCompte();
        donnees.forEach(donnee => {
            console.log("___________________________");
            console.log("Numero de compte: " + donnee.numcompte);
            console.log("Prenom: " + donnee.prenom);
            console.log("Nom: " + donnee.nom);
            console.log("Solde: " + donnee.solde);
            console.log("___________________________");
        });
    } catch (erreurs) {
        console.error("Une erreur s'est produite: " + erreurs);
    } finally {
        connexion.end();
    }
}


main();