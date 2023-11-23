// Introduction aux middlewares avec deux middlewares:
// - Un qui compte le nombre de requete envoye au serveur
// - Un qui affiche des logs ( Nous allons commenter morgan pour ce projet )

// Importation des modules nécessaires
const express = require('express');
// const morgan = require('morgan');
const chalk = require('chalk');
const ejs = require('ejs');
const path = require('path');

// Initialisation d'Express
const app = express();
const port = 3030;


// Nos middlewares 
// Compteur de requete
let compteur = 0;
function compteurDeRequete(requete, reponse, suivant) {
    compteur++;
    console.log(chalk.gray("Nombre de requetes comptees: ") + chalk.green.bold(compteur));
    suivant();
}
const { loggueur } = require('./middlewares');



// Importation des fonctions de gestion de comptes depuis le fichier "./routes"
const {
    listerCompte,
    afficherFormulaire,
    afficherFormulaireModification,
    sauvegarderCompte,
    mettreAJour,
    supprimerCompte
} = require("./routes");


app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

// Middleware pour analyser les données envoyées au format: application/json
app.use(express.json());
// Middleware pour analyser les données envoyées depuis un formulaire: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // Middleware de journalisation avec Morgan
// app.use(
//     //morgan('tiny') // Valeur possible: 'combined' ou 'common' ou 'dev' ou 'short' ou 'tiny'
//     morgan('dev')
// );


// Définition des routes
// Définition de la route principale ("/")
app.get("/", compteurDeRequete, loggueur, listerCompte);
// Définition de la route "/formulaire" pour afficher un formulaire de création de compte
app.get("/formulaire", compteurDeRequete, loggueur, afficherFormulaire);
// Définition de la route pour la modification "/formulaire-modification" pour afficher un formulaire de modification de compte
app.get("/formulaire-modification/:numcompte", compteurDeRequete, loggueur, afficherFormulaireModification);
// Définition de la route POST "/comptes" pour traiter le formulaire de création de compte
app.post("/comptes", compteurDeRequete, loggueur, sauvegarderCompte);
// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/miseajour/:numcompte", compteurDeRequete, loggueur, mettreAJour);
// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/supprimer/:numcompte", compteurDeRequete, loggueur, supprimerCompte);


// Démarrage du serveur Express
app.listen(port, () => {
    console.log(chalk.green("Le serveur tourne sur l'adresse: ") + chalk.blue.bold(`http://localhost:${port}`));
});