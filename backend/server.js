const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Svitlo application" });
});

require("./src/routes/luminaire.routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});