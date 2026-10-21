const Sequelize = require("sequelize");
const db = require("./db.js");

const Luminaire = db.define("luminaire", {
    name: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    power: { type: Sequelize.INTEGER },
    ledCount: { type: Sequelize.INTEGER },
    manufacturer: { type: Sequelize.STRING },
    price: { type: Sequelize.DECIMAL(10, 2) },
    description: { type: Sequelize.STRING }
});

const seed = [
  { name: 'Slim Panel 600', type: 'Panel Light', power: 40, ledCount: 120, manufacturer: 'Philips', price: 45, description: 'Ultra-thin LED panel for offices and living rooms.' },
  { name: 'Street Pro 150', type: 'Street Light', power: 150, ledCount: 96, manufacturer: 'Osram', price: 160, description: 'Weatherproof street luminaire with wide beam angle.' },
  { name: 'Round Downlight', type: 'Downlight', power: 12, ledCount: 24, manufacturer: 'Ledvance', price: 15, description: 'Recessed ceiling downlight with soft glare-free light.' },
  { name: 'Flood Max 100', type: 'Flood Light', power: 100, ledCount: 60, manufacturer: 'Eglo', price: 80, description: 'Bright floodlight for facades, yards and parking.' },
  { name: 'Track Spot 30', type: 'Track Light', power: 30, ledCount: 12, manufacturer: 'Philips', price: 35, description: 'Adjustable track spot for shops and galleries.' },
  { name: 'High Bay 200', type: 'High Bay Light', power: 200, ledCount: 180, manufacturer: 'Svitlo', price: 210, description: 'Industrial high bay luminaire for warehouses.' },
  { name: 'Square Panel 300', type: 'Panel Light', power: 24, ledCount: 72, manufacturer: 'Svitlo', price: 28, description: 'Compact square panel for hallways and kitchens.' },
  { name: 'Street Mini 60', type: 'Street Light', power: 60, ledCount: 48, manufacturer: 'Ledvance', price: 70, description: 'Compact street light for paths and small yards.' }
];

Luminaire.sync({ alter: true })
    .then(() => Luminaire.count())
    .then(count => (count === 0 ? Luminaire.bulkCreate(seed) : null))
    .then(() => console.log("DB synced."));

module.exports = Luminaire;
