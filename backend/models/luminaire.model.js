const Sequelize = require("sequelize");
const db = require("./db.js");

const Luminaire = db.define("luminaire", {
    type: { type: Sequelize.STRING },
    power: { type: Sequelize.INTEGER },
    ledCount: { type: Sequelize.INTEGER },
    manufacturer: { type: Sequelize.STRING }
});

Luminaire.sync().then(() => { 
    console.log("Drop and re-sync db."); 
});

module.exports = Luminaire;