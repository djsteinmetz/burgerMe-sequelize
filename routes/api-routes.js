var db = require("../models");
// Use Handlebars to render the main index.html page with the todos in it.
module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log("got here");
        db.Burger.findAll({}).then(function (data) {
            console.log(data);
            var hbsObj = {
                burgers: data
            };
            console.log("OBJECT: ", hbsObj);
            res.render("index", hbsObj);
        });
    });

    // POST route for saving a new todo. We can create a todo using the data on req.body
    app.post("/api/burgers", function (req, res) {
        console.log("FULL REQ: ", req);
        console.log("REQ BODY: ", req.body);
        db.Burger.create({
            burger_name: req.body.burger_name,
        }).then(function (result) {
            res.json(result);
        })

    });

    app.put("/api/burgers/:id", function (req, res) {
        console.log(req.body);
        db.Burger.update({
            devoured: req.body.devoured
        }, {
                where: {
                    id: req.params.id,
                }
            }).then(function (result) {
                res.json(result);
            })
    });

    app.delete("/api/burgers/:id", function (req, res) {
        // console.log(req.)
        console.log(req.body);
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
};

