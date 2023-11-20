// Importation des modules nécessaires
const express = require('express');

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

    page = page.concat("<table><tr><th>Numero compte</th><th>Prenom</th><th>Nom</th><th>Solde</th><th>Actions</th></tr>");
    donnees.forEach(donnee => {
        page = page.concat("<tr><td>" + donnee.numcompte + "</td><td>" + donnee.prenom + "</td><td>" + donnee.nom + "</td><td>" + donnee.solde + "</td><td><a href='/formulaire-modification/" + donnee.numcompte + "'>Modifier</a><form method='post' action='/supprimer/" + donnee.numcompte + "'><input type='submit' value='Supprimer'></form></td></tr>");
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

// Définition de la route pour la modification "/formulaire-modification" pour afficher un formulaire de modification de compte
app.get("/formulaire-modification/:numcompte", (requete, reponse) => {
    let numcompte = requete.params.numcompte;
    // Construction de la page HTML avec un formulaire
    let page = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>MySQL Connexion</title></head><body>";
    page = page.concat("<a href='/'>Liste des comptes</a> <a href='/formulaire'>Création d'un compte</a> <form method='post' action='/miseajour/" + numcompte + "'>Numero du compte<input type='text' value='" + numcompte + "'><br> Nouveau solde<input name='nouveauSolde' type='text'><br><input type='submit' value='Modifier'></form></body></html>");
    reponse.send(page);
});

// Définition de la route POST "/comptes" pour traiter le formulaire de création de compte
app.post("/comptes", (requete, reponse) => {
    // Appel de la fonction pour créer un compte avec les données du formulaire
    createCompte(requete.body.numcompte, requete.body.prenom, requete.body.nom, requete.body.solde);
    // Redirection vers la route "/"
    reponse.redirect("/");
});

// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/miseajour/:numcompte", (requete, reponse) => {
    // Appel de la fonction pour créer un compte avec les données du formulaire
    updateCompte(requete.params.numcompte, requete.body.nouveauSolde);
    // Redirection vers la route "/"
    reponse.redirect("/");
});

// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/supprimer/:numcompte", (requete, reponse) => {
    let numcompte = requete.params.numcompte;
    // Appel de la fonction pour créer un compte avec les données du formulaire
    deleteCompte(numcompte);
    // Redirection vers la route "/"
    reponse.redirect("/");
});


// Démarrage du serveur Express
app.listen(port, () => {
    console.log("Le serveur tourne sur l'adresse: http://localhost:" + port + "/");
});
