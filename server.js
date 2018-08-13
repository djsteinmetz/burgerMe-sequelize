var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;
var db = require("./models");
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/api-routes")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
})