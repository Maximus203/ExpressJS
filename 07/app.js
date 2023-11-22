// Utilisation de nodemon comme dependance de developpement pour relancer automatiquement le serveur au changement du code.
// Creation de script de lancement du serveur npm run start-app && npm run start-all
// Utilisation de morgan, middleware de journalisation pour express qui enregistre les requetes HTTP dans nos logs

// Utilisation de chalk pour colorier les logs: Verision installer chalk@4.1.2. La version 5(derniere version a date) cause des problemes !

// Importation des modules nécessaires
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
// Initialisation d'Express
const app = express();
const port = 3030;

// Importation des fonctions de gestion de comptes depuis le fichier "./routes"
const {
    listerCompte,
    afficherFormulaire,
    afficherFormulaireModification,
    sauvegarderCompte,
    mettreAJour,
    supprimerCompte
} = require("./routes");

// Middleware pour analyser les données envoyées au format: application/json
app.use(express.json());
// Middleware pour analyser les données envoyées depuis un formulaire: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware de journalisation avec Morgan
app.use(
    //morgan('tiny') // Valeur possible: 'combined' ou 'common' ou 'dev' ou 'short' ou 'tiny'
    morgan('dev')
);


// Définition des routes
// Définition de la route principale ("/")
app.get("/", listerCompte);
// Définition de la route "/formulaire" pour afficher un formulaire de création de compte
app.get("/formulaire", afficherFormulaire);
// Définition de la route pour la modification "/formulaire-modification" pour afficher un formulaire de modification de compte
app.get("/formulaire-modification/:numcompte", afficherFormulaireModification);
// Définition de la route POST "/comptes" pour traiter le formulaire de création de compte
app.post("/comptes", sauvegarderCompte);
// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/miseajour/:numcompte", mettreAJour);
// Définition de la route POST "/miseajour" pour traiter le formulaire de modification de compte
app.post("/supprimer/:numcompte", supprimerCompte);


// Démarrage du serveur Express
app.listen(port, () => {
    console.log(chalk.green("Le serveur tourne sur l'adresse: ") + chalk.blue(`http://localhost:${port}/`));
});
