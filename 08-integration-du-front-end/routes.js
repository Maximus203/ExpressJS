// Importation des fonctions liées à la base de données depuis le fichier "./databases"
const {
    listCompte,
    createCompte,
    updateCompte,
    deleteCompte
} = require("./databases");

// Fonction pour lister les comptes
async function listerCompte(requete, reponse) {
    let donnees = await listCompte();
    // Envoi de la page au client avec les donnees
    reponse.render("liste", { donnees: donnees });
}

// Fonction pour afficher le formulaire de création de compte
function afficherFormulaire(requete, reponse) {
    // Envoi de la page au clients
    reponse.render("creation");
}

// Fonction pour afficher le formulaire de modification de compte
function afficherFormulaireModification(requete, reponse) {
    let numcompte = requete.params.numcompte;
    // Envoi de la page au client avec le numero du compte a modifier
    reponse.render("modification", { numcompte: numcompte });
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
