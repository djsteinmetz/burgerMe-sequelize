var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var db = require("./models");
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/burger-controller")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({force: false}).then(function() {
    app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
})