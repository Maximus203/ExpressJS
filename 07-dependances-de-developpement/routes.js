// Importation des fonctions liées à la base de données depuis le fichier "./databases"
const {
    listCompte,
    createCompte,
    updateCompte,
    deleteCompte
} = require("./databases");

// Fonction pour lister les comptes
async function listerCompte(requete, reponse) {
    // Construction de la page HTML
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body><a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a>";
    let donnees = await listCompte();

    page = page.concat("<table><tr><th>Numero compte</th><th>Prenom</th><th>Nom</th><th>Solde</th><th>Actions</th></tr>");
    donnees.forEach(donnee => {
        page = page.concat("<tr><td>" + donnee.numcompte + "</td><td>" + donnee.prenom + "</td><td>" + donnee.nom + "</td><td>" + donnee.solde + "</td><td><a href='/formulaire-modification/" + donnee.numcompte + "'>Modifier</a><form method='post' action='/supprimer/" + donnee.numcompte + "'><input type='submit' value='Supprimer'></form></td></tr>");
    });
    page = page.concat("</table></body></html>");

    // Envoi de la page au client
    reponse.send(page);
}

// Fonction pour afficher le formulaire de création de compte
function afficherFormulaire(requete, reponse) {
    // Construction de la page HTML avec un formulaire
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    page = page.concat("<a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a> <form method='post' action='/comptes'>Numero du compte<input name='numcompte' type='text'><br>Prenom<input name='prenom' type='text'><br>Nom<input name='nom' type='text'><br>Solde<input name='solde' type='text'><br><input type='submit' value='Créer'></form></body></html>");
    reponse.send(page);
}

// Fonction pour afficher le formulaire de modification de compte
function afficherFormulaireModification(requete, reponse) {
    let numcompte = requete.params.numcompte;
    // Construction de la page HTML avec un formulaire
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    page = page.concat("<a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a> <form method='post' action='/miseajour/" + numcompte + "'>Numero du compte<input type='text' value='" + numcompte + "'><br> Nouveau solde<input name='nouveauSolde' type='text'><br><input type='submit' value='Modifier'></form></body></html>");
    reponse.send(page);
}

// Fonction pour sauvegarder un nouveau compte
function sauvegarderCompte(requete, reponse) {
    // Appel de la fonction pour créer un compte avec les données du formulaire
    createCompte(requete.body.numcompte, requete.body.prenom, requete.body.nom, requete.body.solde);
    // Redirection vers la route "/"
    reponse.redirect("/");
}

// Fonction pour mettre à jour un compte existant
function mettreAJour(requete, reponse) {
    // Appel de la fonction pour mettre à jour un compte avec les données du formulaire
    updateCompte(requete.params.numcompte, requete.body.nouveauSolde);
    // Redirection vers la route "/"
    reponse.redirect("/");
}

// Fonction pour supprimer un compte
function supprimerCompte(requete, reponse) {
    let numcompte = requete.params.numcompte;
    // Appel de la fonction pour supprimer un compte
    deleteCompte(numcompte);
    // Redirection vers la route "/"
    reponse.redirect("/");
}

// Exportation des fonctions pour les rendre accessibles depuis d'autres fichiers
module.exports = {
    listerCompte,
    afficherFormulaire,
    afficherFormulaireModification,
    sauvegarderCompte,
    mettreAJour,
    supprimerCompte
};
