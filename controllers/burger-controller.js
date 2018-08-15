var db = require("../models");
// Use Handlebars to render the main index.html page with the todos in it.

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Burger.findAll({
            include: [{model: db.User}]
        }).then(function (data) {
            var hbsObj = {
                burgers: data
            };
            res.render("index", hbsObj);
        });
    });
    app.get("/api/burgers/", function (req, res) {
        db.Burger.findAll({
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/burgers/menu", function (req, res) {
        db.Burger.findAll({
            where: {
                devoured: false
            },
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/burgers/devoured", function (req, res) {
        db.Burger.findAll({
            where: {
                devoured: true
            },
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });

    // POST route for saving a new todo. We can create a todo using the data on req.body
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: false
        }).then(function (result) {
            res.json(result);
        })
    });

    app.put("/api/burgers/:id", function (req, res) {
        if (req.body.user) {
            db.User.create({
                name: req.body.user,
                BurgerId: req.body.id
            }).then(function (dbCustomer) {
                return db.Burger.update({
                    devoured: req.body.devoured
                }, {
                        where: {
                            id: req.params.id,
                        }
                    }).then(function (result) {
                        res.json(result);
                    })
            })
        }

    });

    app.delete("/api/burgers/:id", function (req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
}
