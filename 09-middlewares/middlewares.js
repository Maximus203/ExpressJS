const chalk = require('chalk');
const { format } = require('date-fns');

function loggueur(requete, reponse, suivant) {
    const dateCourante = format(new Date(), 'dd/MM/yy - HH:mm', { timeZone: 'Africa/Senegal' });

    console.log(chalk.red('LOG:') + `  [${dateCourante}] -  ${chalk.yellow(requete.method)} ${chalk.blue(requete.url)}`);
    suivant();
}

module.exports = { loggueur };