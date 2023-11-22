const afficherVoiture = require('./first-module');
const { afficherBonjour } = require('./second-module');

console.log(require('./first-module'));

afficherBonjour();
afficherVoiture();
